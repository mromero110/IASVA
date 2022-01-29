import { faPlus, faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, AppRegistry, Modal, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FormInput } from "../componets/formInput";
import { RoundButtonPrimary } from "../componets/roundButtonStyle";
import { WebApiConfig } from "../config/initialConfig";
import { RoutesMenu } from "../config/routes";
import { useFormValidator } from "../hooks/useFormValidator";
import { useStorage } from "../hooks/useStorage";
import { useWebApi } from "../hooks/useWebApi";
import { IFormProp } from "../models/data/formProp";
import { SecureZoneRequest } from "../models/request/secureZoneRequest";
import { WifiZoneRequest } from "../models/request/wifiZoneRequest";
import { SecureZoneResponse } from "../models/response/secureZoneResponse";
import { WifiZoneResponse } from "../models/response/wifiZoneResponse";
import { ColorTheme } from "../theme/appTheme";

type Props = NativeStackScreenProps<RoutesMenu, 'SecureZone'>;

interface IButtonIconProps {
    text: string,
    onClick: () => void
}

const ButtonIcon = (props: IButtonIconProps) => {
    const { text, onClick } = props;

    return <View style={style.container_button}>
        <Text style={style.text}>
            {text}
        </Text>
        <TouchableOpacity onPress={onClick}>
            <View style={style.icons}>
                <FontAwesomeIcon
                    icon={faPlus}
                    size={10}
                    color={ColorTheme.white} />
            </View>
        </TouchableOpacity>
    </View>
}

type SecureZoneType = "Wifi" | "Gps";

enum formType {
    RED,
    RED_CONTRASENA,
    GPS,
    GPS_LATITUD,
    GPS_LONGITUD,
    GPS_RANGO
}

const formWifi = [
    {
        code: formType.RED,
        name: "Nombre de Red",
        maxLength: 20,
        required: true,
    }, {
        code: formType.RED_CONTRASENA,
        name: "Contraseña",
        maxLength: 20,
        required: true,
    }
] as IFormProp[];

const formGps = [
    {
        code: formType.GPS,
        name: "Nombre de la zona",
        maxLength: 20,
        required: true,
    }, {
        code: formType.GPS_LATITUD,
        name: "Latitud",
        maxLength: 20,
        keyboard: "decimal-pad",
        required: true,
    }, {
        code: formType.GPS_LONGITUD,
        name: "Longitud",
        maxLength: 20,
        keyboard: "decimal-pad",
        required: true,
    }, {
        code: formType.GPS_RANGO,
        name: "Rango en metros",
        maxLength: 3,
        keyboard: "numeric",
        required: true,
    }
] as IFormProp[];

const SecureZoneScreen = ({ navigation, route }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [zona, setZona] = useState<SecureZoneType>("Wifi");
    const wifi = useFormValidator(formWifi);
    const gps = useFormValidator(formGps);
    const webapi = useWebApi(WebApiConfig);
    const store = useStorage();
    const [device, setDevice] = useState(0);

    const [listGps, setListGps] = useState<SecureZoneResponse[]>([]);
    const [listWifi, setListWifi] = useState<WifiZoneResponse[]>([]);


    useEffect(() => {
        setContent();
    }, []);

    const setContent = async () => {
        const list = await webapi.device.list();
        const data = await store.get("serial");
        const current = list.find(m => m.Serial == data.serial);
        if (current) {
            setDevice(current.Id);
            const lgps = await webapi.zone.listSecureZone(current.Id);
            const lwifi = await webapi.zone.listWifi(current.Id);
            setListGps(lgps);
            setListWifi(lwifi);
        }
    }


    const onSaveWifi = async () => {
        if (wifi.actions.validate()) {
            setModalVisible(false);
            ToastAndroid.show("Procesando wifi", ToastAndroid.SHORT);
            const data = {
                EsFisico: false,
                Estado: true,
                IdDispositivo: device,
                Nombre: wifi.actions.getForm(formType.RED),
                Serial: wifi.actions.getForm(formType.RED_CONTRASENA)
            } as WifiZoneRequest;
            await webapi.zone.saveWifi(data);
            setContent();
            wifi.actions.clear();
            ToastAndroid.show("Guardado correctamente", ToastAndroid.SHORT);
        } else {
            Alert.alert("Alerta", "complete todos los campos para continuar");
        }
    }
    const onSaveGps = async () => {
        if (gps.actions.validate()) {
            setModalVisible(false);
            ToastAndroid.show("Procesando gps", ToastAndroid.SHORT);
            const data = {
                Estado: true,
                IdDispositivo: device,
                Latitud: gps.actions.getForm(formType.GPS_LATITUD),
                Longitud: gps.actions.getForm(formType.GPS_LONGITUD),
                Nombre: gps.actions.getForm(formType.GPS),
                Rango: gps.actions.getForm(formType.GPS_RANGO) || 0,
                Presicion: 0
            } as SecureZoneRequest;
            await webapi.zone.saveSecureZone(data);
            setContent();
            gps.actions.clear();
            ToastAndroid.show("Guardado correctamente", ToastAndroid.SHORT);
        } else {
            Alert.alert("Alerta", "complete todos los campos para continuar");
        }
    }

    const addWifiZone = () => {
        setZona("Wifi");
        setModalVisible(true);
    }

    const addGpsZone = () => {
        setZona("Gps");
        setModalVisible(true);
    }

    return <View style={style.container}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible); }}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Text style={style.text_modal}>
                        {zona == "Gps" && "Registrar Wifi Seguro"}
                        {zona == "Wifi" && "Registrar Gps Seguro"}
                    </Text>
                    <View style={style.form}>
                        {zona == "Wifi" && <View>
                            {wifi.form.map((inp, k) =>
                                <View key={k + "wifi"} style={style.form_input}>
                                    <FormInput input={inp} onValueChange={wifi.actions.onChangeValue} />
                                </View>
                            )}
                            <RoundButtonPrimary
                                onPress={onSaveWifi}
                                text={"Guardar"} />
                        </View>}
                        {zona == "Gps" && <View>
                            {gps.form.map((inp, k) =>
                                <View key={k + "gps"} style={style.form_input}>
                                    <FormInput input={inp} onValueChange={gps.actions.onChangeValue} />
                                </View>
                            )}
                            <RoundButtonPrimary
                                onPress={onSaveGps}
                                text={"Guardar"} />
                        </View>}
                    </View>
                </View>
            </View>
        </Modal>
        <View>
            <View style={style.button}>
                <ButtonIcon text="Agregar Zona Gps Segura" onClick={addGpsZone} />
            </View>
            <View style={style.button}>
                <ButtonIcon text="Agregar Zona Wifi Segura" onClick={addWifiZone} />
            </View>
        </View>
        <View style={{ flex: 1 }}>
            <ScrollView >
                <View style={style.content}>
                    {listWifi.length > 0 &&
                        <View style={[style.button, { paddingBottom: 8 }]}>
                            <Text style={style.text_list}>
                                Zonas Wifi Seguras
                            </Text>
                            {listWifi.map((item, index) => {
                                return <View key={index + "wifi-state"}>
                                    <Text style={style.zone}>
                                        SSID : {item.Nombre}
                                    </Text>
                                </View>
                            })}
                        </View>
                    }
                    {listGps.length > 0 &&
                        <View style={[style.button, { paddingBottom: 8 }]}>
                            <Text style={style.text_list}>
                                Zonas Gps Seguras
                            </Text>
                            {listGps.map((item, index) => {
                                return <View key={index + "gps-state"}>
                                    <Text style={style.zone}>
                                        UBICACION :  {item.Nombre}
                                    </Text>
                                </View>
                            })}
                        </View>
                    }
                </View>
            </ScrollView>
        </View >
    </View >
}

export default SecureZoneScreen;

const style = StyleSheet.create({
    container: {
        backgroundColor: ColorTheme.white,
        flex: 1
    },
    container_button: {
        flexDirection: "row",
        padding: 10
    },
    zone: {
        paddingVertical: 4,
        paddingLeft: 8,
        fontSize: 16
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    form: {
        padding: 20,
        width: "100%"
    },
    form_input: {
        width: "100%"
    },
    content: {
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        alignSelf: "center"
    },
    text_list: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8
    },
    button: {
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: ColorTheme.backgroud,
        paddingLeft: 10
    },
    icons: {
        borderWidth: 1,
        borderColor: ColorTheme.backgroud,
        borderRadius: 50,
        padding: 15,
        backgroundColor: ColorTheme.primary
    },
    enteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    text_modal: {
        justifyContent: "center",
        paddingTop: 20,
        fontSize: 18,
        fontWeight: "bold"
    },
    modalView: {
        margin: 20,
        width: 250,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});