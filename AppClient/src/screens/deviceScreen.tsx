import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import DeviceInfo from 'react-native-device-info';
import { Alert, Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FormInput } from "../componets/formInput";
import { RoundButtonPrimary } from "../componets/roundButtonStyle";
import { InitialConfig, WebApiConfig } from "../config/initialConfig";
import { Routes } from "../config/routes";
import { ColorTheme } from "../theme/appTheme";
import { useFormValidator } from "../hooks/useFormValidator";
import { useStorage } from "../hooks/useStorage";

type Props = NativeStackScreenProps<Routes, 'QrReader'>;

const formConfig = [
    {
        code: 0,
        name: "",
        required: true,
        disabled: false
    }
];

const DeviceScreen = ({ navigation, route }: Props) => {
    const { qrReader } = InitialConfig;
    const [device, setDevice] = useState("");
    const qrCode = require("../assets/images/qrcode.png")
    const barCode = require("../assets/images/barcode.png")
    const { form, actions } = useFormValidator(formConfig);
    const store = useStorage();
    
    useEffect(() => {
        const device = DeviceInfo.getUniqueId();
        setDevice(device);
    }, []);

    const onNext = async () => {
        if (actions.validate()) {
            ToastAndroid.show("Validando código", ToastAndroid.CENTER);
            const code = actions.getForm(0) || "";
            store.set("code", { data: code });
            navigation.goBack();
        } else {
            Alert.alert("Alerta", "Complete todos los campos antes de continuar")
        }
    }

    return (
        <View style={style.backgroud}>
            <ScrollView>
                <View style={style.container}>
                    <View style={[style.container_top, style.center]}>
                        <Text style={[style.title, style.title_qr]}>
                            {qrReader.lblQrTitle}
                        </Text>
                        <View style={style.image} >
                            <Image style={style.qrCode} source={qrCode} />
                        </View>
                        <View style={style.subtitle}>
                            {form.map((inp, k) =>
                                <View key={k}>
                                    <FormInput
                                        input={inp}
                                        onValueChange={actions.onChangeValue}
                                        displayName={
                                            <Text style={[style.title, style.title_code]}>
                                                {qrReader.lblCode}
                                            </Text>
                                        } />
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={style.container_bottom}>
                        <View style={[style.container, style.center]}>
                            <Text style={[style.title, style.title_serial]}>
                                {qrReader.lblSerial}
                            </Text>
                            <Image style={style.barCode} source={barCode} />
                            <Text style={style.code}>{device}</Text>
                            <Text style={style.summary}>{qrReader.lblInfo}</Text>
                        </View>
                        <View style={style.button}>
                            <RoundButtonPrimary text={qrReader.btnNext} onPress={onNext} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default DeviceScreen;

const style = StyleSheet.create({
    backgroud: {
        flex: 1,
        backgroundColor: ColorTheme.white
    },
    container: {
        flex: 1,
    },
    center: {
        alignItems: "center",
    },
    container_top: {
        flex: 0.6,
        backgroundColor: ColorTheme.primary,
        padding: 10
    },
    container_bottom: {
        flex: 0.4,
        backgroundColor: ColorTheme.white,
        paddingHorizontal: 6,
        paddingTop: 6
    },
    qrCode: {
        width: 200,
        height: 200
    },
    barCode: {
        width: 200,
        height: 50
    },
    image: {
        padding: 8,
        marginVertical: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle: {
        marginTop: 8,
        padding: 4,
    },
    title_qr: {
        marginTop: 20,
        color: ColorTheme.white
    },
    title_code: {
        color: ColorTheme.white
    },
    title_serial: {
        color: ColorTheme.black,
        marginVertical: 10,
        paddingBottom: 10
    },
    code: {
        fontWeight: "bold",
        color: ColorTheme.black,
        marginVertical: 4
    },
    summary: {
        marginVertical: 4,
        textAlign: "center"
    },
    button: {
        marginTop: 8,
        marginHorizontal: 16
    }
});