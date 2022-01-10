import React from "react";
import { ImageBackground, SafeAreaView, View, StatusBar, Image } from "react-native";
import { RoundButtonPrimary, RoundButtonSecondary } from "../../componets/roundbutton";
import { InitialConfig } from "../../config/initialConfig";
import { ColorTheme, LoginTheme } from "../../theme/appTheme";


const LoginScreen = () => {
    const { loginForm } = InitialConfig;
    const background = require("../../assets/images/login_backgroud.png")
    const logo = require("../../assets/images/logo.png")
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={ColorTheme.primary} barStyle="light-content" />
            <ImageBackground source={background} style={LoginTheme.background}>
                <View style={LoginTheme.container}>
                    <View style={LoginTheme.logo_container}>
                        <Image style={LoginTheme.logo_image} source={logo} />
                    </View>
                    <View style={LoginTheme.button_container}>
                        <RoundButtonPrimary text={loginForm.btnLogin} />
                        <RoundButtonSecondary text={loginForm.btnSetup} />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default LoginScreen;