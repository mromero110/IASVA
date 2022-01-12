
import React from "react";
import { ImageBackground, SafeAreaView, View, StatusBar, Image, StyleSheet } from "react-native";
import { InitialConfig } from "../../config/initialConfig";
import { ColorTheme, MainTheme } from "../../theme/appTheme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "../../config/routes";
import { RoundButtonPrimary } from "../../componets/roundButtonPrimary";
import { RoundButtonSecondary } from "../../componets/roundButtonSecondary";

type Props = NativeStackScreenProps<Routes, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
    const { login } = InitialConfig;
    const background = require("../../assets/images/login_backgroud.png")
    const logo = require("../../assets/images/logo.png")

    const onLoginPress = () => {
        // elimina la opcion de regresar atras
        navigation.reset({
            index: 0,
            routes: [{ name: 'Register' }]
        });
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={ColorTheme.primary} barStyle="light-content" />
            <ImageBackground source={background} style={MainTheme.backgroun_white}>
                <View style={MainTheme.container}>
                    <View style={style.logo_container}>
                        <Image style={style.logo_image} source={logo} />
                    </View>
                    <View style={style.button_container}>
                        <RoundButtonPrimary onPress={onLoginPress} text={login.btnLogin} />
                        <RoundButtonSecondary text={login.btnSetup} />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default LoginScreen;

const style = StyleSheet.create({
    button_container: {
        alignItems: "center"
    },
    logo_container: {
        flex: 1,
        alignSelf: "center",
        marginTop: 20
    },
    logo_image: {
        width: 240,
        height: 240
    }
});