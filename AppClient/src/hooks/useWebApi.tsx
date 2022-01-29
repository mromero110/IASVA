
import axios from 'axios';
import { ConfigRequest } from "../models/request/configRequest";
import { DispositivoRequest } from "../models/request/DispositivoRequest";
import { SecureZoneRequest } from "../models/request/secureZoneRequest";
import { WifiZoneRequest } from "../models/request/wifiZoneRequest";
import { SecureZoneResponse } from "../models/response/secureZoneResponse";
import { WifiZoneResponse } from "../models/response/wifiZoneResponse";
import { DeviceActionRequest } from "../models/request/deviceActionRequest";
import { Credentials } from "../models/data/credentials";
import { useStorage } from "./useStorage";
import { MessageResponse } from "../models/response/messageResponse";
import { DispositivoResponse } from '../models/response/dispositivoResponse';
import { IMarkers } from '../screens/gpsScreen';

export interface IWebApiProps {
    baseUrl: string;
}

export interface DipositivoEndPoint {
    config(device: number, serial: string): Promise<void>;
    save(request: DispositivoRequest): Promise<MessageResponse>;
    saveConfiguration(device: number, request: ConfigRequest): Promise<void>;
    list(): Promise<DispositivoResponse[]>;
}

export interface GpsEndPoint {
    list(dispositivo: number): Promise<IMarkers[]>;
}

export interface SecurityEndPoint {
    getToken(credentials: Credentials): Promise<void>;
}

export interface ZonasEndPoint {
    listWifi(device: number): Promise<WifiZoneResponse[]>;
    listSecureZone(device: number): Promise<SecureZoneResponse[]>;
    saveWifi(request: WifiZoneRequest): Promise<void>;
    saveSecureZone(request: SecureZoneRequest): Promise<void>;
}

interface HeaderConfig {
    headers: {
        Authorization: string
    }
}

interface TimeStorage {
    last: number
}

export const useWebApi = (initialValue: IWebApiProps) => {

    const { baseUrl } = initialValue;
    const storage = useStorage();

    const setTokenStorage = (token: HeaderConfig) => {
        storage.set("token", token);
    }

    const setCredentialStorage = (credentials: Credentials) => {
        storage.set("login", credentials);
    }

    const setTimeStorage = (time: TimeStorage) => {
        storage.set("time", time);
    }

    const login = async (credentials: Credentials) => {
        const url = `${baseUrl}/api/security/authenticate`;
        let tk = {} as HeaderConfig | undefined;
        await axios.post(url, credentials).then(response => {
            //  console.log(response.data);
            tk = { headers: { Authorization: `Bearer ${response.data.Token}` } };
            setTimeStorage({ last: Date.now() });
            setTokenStorage(tk);
            setCredentialStorage(credentials);
        }).catch((error) => {
            tk = undefined;
        });
        return tk != undefined;
    }

    const getToken = async () => {
        const currentTime = Date.now();
        const lastTime = await storage.get("time");
        const timeLimit = 5 * 60 * 1000; // 5 minutos en milisegundos
        if ((currentTime - lastTime.last) > timeLimit) {
            // console.log("desde config");
            return await configToken();
        } else {
            // console.log("desde storage");
            return await storage.get("token");
        }
    }

    const configToken = async () => {
        const url = `${baseUrl}/api/security/authenticate`;
        const credentials = await storage.get("login").then(result => result);
        let tk = {} as HeaderConfig;
        await axios.post(url, credentials).then(response => {
            tk = {
                headers: { Authorization: `Bearer ${response.data.Token}` }
            };
            setTimeStorage({
                last: Date.now()
            });
            setTokenStorage(tk);
        });
        return tk;
    }

    const save = async (request: DispositivoRequest) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/dispositivo`;
        return await axios.post(url, request, brtoken).then(response => response.data);
    }


    const list = async () => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/dispositivo/list`;
        return await axios.get(url, brtoken).then(response => response.data);
    }

    const saveConfiguration = async (device: number, request: ConfigRequest) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/dispositivo/${device}/configuracion`;

        return await axios.post(url, request, brtoken).then(response => {
            logAction(device, "Configuracion actualizada");
            return response.data
        });
    }

    const logAction = async (device: number, title: string) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/dispositivo/${device}/actions/TEL`;
        const request = {
            Estado: "Configuración actualizada",
            Latitud: "0,0",
            Longitud: "0,0",
            Zona: "Desconocida"
        } as DeviceActionRequest;
        return await axios.post(url, request, brtoken).then(response => response.data);
    }

    const getActionToday = async (device: number) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/dispositivo/${device}/actions/today`;
        return await axios.get(url, brtoken).then(response => response.data);
    }

    const getActionHistory = async (device: number) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/dispositivo/${device}/actions/history`;
        return await axios.get(url, brtoken).then(response => response.data);
    }

    const getGpsList = async (device: number) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/gps/${device}`;
        return await axios.get(url, brtoken).then(response => response.data);
    }

    const config = async (device: number, serial: string) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/dispositivo/${device}/serial/${serial}`;
        return await axios.get(url, brtoken).then(response => response.data);
    }

    const listWifi = async (device: number) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/zona/wifi/${device}`;
        return await axios.get(url, brtoken).then(response => response.data);
    }

    const listSecureZone = async (device: number) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/zona/segura/${device}`;
        return await axios.get(url, brtoken).then(response => response.data);
    }

    const saveWifi = async (request: WifiZoneRequest) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/zona/wifi`;
        return await axios.post(url, request, brtoken).then(response => response.data);
    }

    const saveSecureZone = async (request: SecureZoneRequest) => {
        const brtoken = await getToken();
        const url = `${baseUrl}/api/zona/segura`;
        return await axios.post(url, request, brtoken).then(response => response.data);
    }

    return {
        account: {
            login
        },
        actions: {
            getActionToday,
            getActionHistory
        },
        device: {
            config,
            save,
            list,
            saveConfiguration
        } as {} as DipositivoEndPoint,
        gps: {
            list: getGpsList
        } as {} as GpsEndPoint,
        zone: {
            listWifi,
            listSecureZone,
            saveWifi,
            saveSecureZone
        } as {} as ZonasEndPoint
    }
}