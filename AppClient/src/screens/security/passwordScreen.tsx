import { faLock, faLockOpen, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageCode from "../../componets/imageCode";
import PassWordKeyBoard from "../../componets/passwordKeyboard";
import { Routes } from "../../config/routes";
import { ColorTheme } from "../../theme/appTheme";

type Props = NativeStackScreenProps<Routes, 'QrReader'>;

const PassWordScreen = ({ navigation, route }: Props) => {
    const maxLength = 4;
    const [step, setStep] = useState(0);
    const [confirm, setConfirm] = useState(false);

    const onConfirm = () => {
        if (!confirm) {
            navigation.setOptions({
                title: "Confirmar Contraseña",
            })
            setStep(0);
            setConfirm(true);
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Menu' }]
            });
        }
    }

    const onErase = () => {
        setStep(0);
    }

    const onPress = () => {
        if (step < maxLength) {
            setStep(step + 1)
        }
    }

    return (
        <View style={style.content}>
            <View style={style.image} >
                <FontAwesomeIcon
                    icon={confirm ? faLock : faLockOpen}
                    size={80}
                    color={ColorTheme.primary} />
                <View style={style.code} >
                    <ImageCode step={step} />
                </View>
            </View>
            <View style={style.keyboard} >
                <PassWordKeyBoard
                    onConfirm={onConfirm}
                    onErase={onErase}
                    onPress={onPress} />
            </View>
        </View>
    );
}

export default PassWordScreen;

const style = StyleSheet.create({
    image: {
        marginTop: 20,
        flex: 0.3,
        alignItems: "center",
    },
    keyboard: {
        flex: 0.7,
        padding: 10,
        marginHorizontal: 16
    },
    code: {
        flex: 1,
        marginTop: 20,
    },
    content: {
        flex: 1,
        padding: 10,
        backgroundColor: ColorTheme.white
    },
    blockLogo: {
        height: 50,
        width: 50
    }
});