import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ImageCode from "../../componets/imageCode";
import PassWordKeyBoard from "../../componets/passwordKeyboard";
import { Routes } from "../../config/routes";

type Props = NativeStackScreenProps<Routes, 'QrReader'>;

const PassWordScreen = ({ navigation, route }: Props) => {

    const blocklogo = require("../../assets/images/qrcode.png")
    const [step, setStep] = useState(0);

    const onConfirm = () => { }

    const onErase = () => { }

    const onPress = () => { }

    return (
        <View>
            <View style={style.image} >
                <Image style={style.blockLogo} source={blocklogo} />
            </View>
            <Text>
                Registrar una contraseña
            </Text>
            <ImageCode length={4} step={step} />
            <PassWordKeyBoard
                onConfirm={onConfirm}
                onErase={onErase}
                onPress={onPress} />
        </View>
    );
}

export default PassWordScreen;

const style = StyleSheet.create({
    image: {

    },
    blockLogo: {

    }
});