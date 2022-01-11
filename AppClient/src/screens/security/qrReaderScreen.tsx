import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RoundButtonPrimary } from "../../componets/roundButton";
import { InitialConfig } from "../../config/initialConfig";
import { Routes } from "../../config/routes";
import { ColorTheme, MainTheme } from "../../theme/appTheme";

type Props = NativeStackScreenProps<Routes, 'QrReader'>;

const QrReaderScreen = ({ navigation, route }: Props) => {
    const { qrReader } = InitialConfig;
    const [code, setCode] = useState("QR045608");
    const qrCode = require("../../assets/images/qrcode.png")
    const barCode = require("../../assets/images/barcode.png")

    const onNext = () => {
        navigation.goBack();
    }

    return (
        <View style={style.container}>
            <View style={[style.container_top, style.center]}>
                <Text style={[style.title, style.title_qr]}>
                    {qrReader.lblQrTitle}
                </Text>
                <View style={style.image} >
                    <Image style={style.qrCode} source={qrCode} />
                </View>
                <Text style={[style.title, style.title_code]}>
                    {code}
                </Text>
                <Text style={style.subtitle}>
                    {qrReader.lblCode}
                </Text>
            </View>
            <View style={style.container_bottom}>
                <View style={[style.container, style.center]}>
                    <Text style={[style.title, style.title_serial]}>
                        {qrReader.lblSerial}
                    </Text>
                    <Image style={style.barCode} source={barCode} />
                    <Text style={style.code}>{code}</Text>
                    <Text style={style.summary}>{qrReader.lblInfo}</Text>
                </View>
                <View style={style.button}>
                    <RoundButtonPrimary text={qrReader.btnNext} onPress={onNext} />
                </View>
            </View>
        </View>
    );
}

export default QrReaderScreen;

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: "center",
    },
    container_top: {
        flex: 0.6,
        backgroundColor: ColorTheme.primary,
        padding: 20
    },
    container_bottom: {
        flex: 0.4,
        backgroundColor: ColorTheme.white,
        padding: 6
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
        fontSize: 14,
        fontWeight: "bold",
        color: ColorTheme.white
    },
    title_qr: {
        marginTop: 50,
        color: ColorTheme.white
    },
    title_code: {
        color: ColorTheme.white
    },
    title_serial: {
        color: ColorTheme.black,
        marginVertical: 10
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
        marginHorizontal: 16
    }
});