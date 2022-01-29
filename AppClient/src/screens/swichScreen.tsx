import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FlatList } from "react-native-gesture-handler";
import { RoutesMenu } from "../config/routes";
import { ColorTheme } from "../theme/appTheme";
import { RoundButtonPrimary, RoundButtonSecondary } from "../componets/roundButtonStyle";
import { FormCheckBox } from "../componets/formCheckbox";
import { useWebApi } from "../hooks/useWebApi";
import { WebApiConfig } from "../config/initialConfig";
import { useStorage } from "../hooks/useStorage";
import { ConfigRequest } from "../models/request/configRequest";

type Props = NativeStackScreenProps<RoutesMenu, 'Swich'>;

const defaultConfig = {
    ZonaWifi: false,
    ApagadoEmergencia: false,
    Alarma: false,
    Camara: false
}

type ConfigType = "ZonaSegura" | "Apagado" | "Alarma" | "Camara";

const SwichScreen = ({ navigation, route }: Props) => {

    const [seguro, setAsegurado] = useState(false);
    const [bloqueo, setBloqueo] = useState(false);
    const [consola, setConsola] = useState<String[]>([]);
    const [currentCount, setCurrentCount] = useState(0);
    const [config, setConfig] = useState(defaultConfig);
    const list = useRef<FlatList>(null);
    const [device, setDevice] = useState(0);

    const webapi = useWebApi(WebApiConfig);
    const store = useStorage();

    const setConfiguration = async () => {
        const list = await webapi.device.list();
        const data = await store.get("serial");
        const current = list.find(m => m.Serial == data.serial);
        if (current) {
            setLog("Obteniendo configuración");
            setDevice(current.Id);
            const newconfig = await webapi.device.config(current.Id, current.Serial);
            if (newconfig == null) {
                setLog("No se encontró configuración para el dispositivo");
                await webapi.device.saveConfiguration(current.Id, defaultConfig);
                setLog("Configuracón por defecto establecida");
                setConfig(defaultConfig);
            }
            else {
                setLog("Configuracón establecida");
                setConfig(newconfig);
            }
        }
    }

    const forceBloqueo = async (deviceconfig: ConfigRequest) => {
        setLog("Enviando bloqueo forzado");
        await webapi.device.saveConfiguration(device, config);
        setLog("Configuración de bloqueo enviada correctamente");
    }

    const saveConfig = async () => {
        setLog("Enviando nueva configuración");
        await webapi.device.saveConfiguration(device, config);
        setLog("Configuración enviada correctamente");
    }

    useEffect(() => {
        setConfiguration();
    }, []);

    const setLog = async (message: string) => {
        const maxRows = 10
        let log = [...consola];
        const logId = currentCount + 1;
        if (log.length >= maxRows) {
            log = log.slice(1);
        }
        log.push(logId + " | " + message);
        setConsola(log);
        setCurrentCount(logId);
    }

    const onValueChange = (form: ConfigType, value: boolean) => {
        const conf = { ...config };
        switch (form) {
            case "Alarma":
                setLog("Estableciendo vigilancia alarmas");
                conf.Alarma = value;
                break;
            case "Apagado":
                setLog("Enviando apagado de emergencia");
                conf.ApagadoEmergencia = value;
                forceBloqueo(conf);
                break;
            case "Camara":
                setLog("Estableciendo vigilancia de camaras");
                conf.Camara = value;
                break;
            case "ZonaSegura":
                setLog("Estableciendo vigilancia de zonas seguras");
                conf.ZonaWifi = value;
                break;
        }

        if (conf.Alarma == true || conf.Camara == true || conf.ZonaWifi == true) {
            setAsegurado(true);
        }
        else {
            setAsegurado(conf.ApagadoEmergencia);
        }
        setBloqueo(conf.ApagadoEmergencia);
        setConfig(conf);
    }

    const renderItem = ({ item }: { item: String }) => {
        return <Text style={style.console_text}> {item} </Text>;
    }

    return (
        <View style={style.container}>
            <View style={style.status}>
                <FontAwesomeIcon
                    icon={seguro ? faLock : faLockOpen}
                    size={60}
                    color={seguro ? ColorTheme.primary : ColorTheme.accent} />
                <Text style={[style.text, !seguro && style.text_dark]}>
                    {"Su vehiculo se encuentra " + (bloqueo ? "bloqueado " : seguro ? "protegido" : "desprotegido")}
                </Text>
                <View style={style.form}>
                    <FormCheckBox
                        checked={config.Alarma}
                        text={(config.Alarma ? "Desactivar" : "Activar") + " Vigilancia Alarmas "}
                        onValueChange={(value) => onValueChange("Alarma", value)} />
                    <FormCheckBox
                        checked={config.Camara}
                        text={(config.Camara ? "Desactivar" : "Activar") + " Vigilancia Camara"}
                        onValueChange={(value) => onValueChange("Camara", value)} />
                    <FormCheckBox
                        checked={config.ZonaWifi}
                        text={(config.ZonaWifi ? "Desactivar" : "Activar") + " Vigilancia Zonas Seguras"}
                        onValueChange={(value) => onValueChange("ZonaSegura", value)} />
                </View>
                <View style={style.panel}>
                    <View style={style.console}>
                        <FlatList
                            ref={list}
                            style={style.panel}
                            data={consola}
                            renderItem={renderItem}
                            onContentSizeChange={() => list.current?.scrollToEnd()}
                            onLayout={() => list.current?.scrollToEnd()}>
                        </FlatList>
                    </View>
                </View>
            </View>
            <View style={style.center}>
                <View style={{ width: "100%" }}>
                    <RoundButtonSecondary
                        text={(config.ApagadoEmergencia ? "Desactivar" : "Activar") + " bloqueo forzado"}
                        onPress={() => onValueChange("Apagado", !config.ApagadoEmergencia)} />
                    <RoundButtonPrimary text={"Guardar configuración"} onPress={saveConfig} />
                </View>
            </View>
        </View>
    );
}


export default SwichScreen;

const style = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        backgroundColor: ColorTheme.white
    },
    center: {
        alignItems: "center"
    },
    flex: {
        flex: 1
    },
    panel: {
        height: 200,
        width: "100%",
    },
    form: {
        width: "100%",
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "flex-start",
    },
    console: {
        backgroundColor: "black",
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    console_text: {
        fontFamily: "Consolas",
        color: "yellow"
    },
    status: {
        alignItems: "center",
        flex: 1,
        padding: 8,
        marginTop: 20
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20
    },
    text_dark: {
        color: ColorTheme.red
    }
});