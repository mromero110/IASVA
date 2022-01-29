
import React, { useState } from "react";
import { ImageBackground, SafeAreaView, View, StatusBar, Image, StyleSheet, Modal, Text, Alert, ToastAndroid } from "react-native";
import { InitialConfig, WebApiConfig } from "../config/initialConfig";
import { ColorTheme, MainTheme } from "../theme/appTheme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "../config/routes";
import { RoundButtonPrimary, RoundButtonSecondary } from "../componets/roundButtonStyle";
import { IFormProp } from "../models/data/formProp";
import { useFormValidator } from "../hooks/useFormValidator";
import { FormInput } from "../componets/formInput";
import { useWebApi } from "../hooks/useWebApi";
import { Credentials } from "../models/data/credentials";

type Props = NativeStackScreenProps<Routes, 'Login'>;

enum formType {
    USUARIO,
    CONTRASENA
}

const formConfig = [
    {
        code: formType.USUARIO,
        name: "Usuario",
        maxLength: 20,
        required: true,
    }, {
        code: formType.CONTRASENA,
        name: "Contraseña",
        maxLength: 20,
        required: true,
    }
] as IFormProp[];

const LoginScreen = ({ navigation }: Props) => {
    const { login } = InitialConfig;
    const background = require("../assets/images/login_backgroud.png")
    const logo = require("../assets/images/logo.png")
    const [modalVisible, setModalVisible] = useState(false);
    const { form, actions } = useFormValidator(formConfig);

    const webApi = useWebApi(WebApiConfig);

    const onLoginPress = () => {
        setModalVisible(true);
    }

    const onLoginValidate = async () => {
        if (actions.validate()) {
            const credentials = {
                CrypUsername: actions.getForm(formType.USUARIO),
                CrypPassword: actions.getForm(formType.CONTRASENA)
            } as Credentials;
            ToastAndroid.show("Procesando...", ToastAndroid.SHORT);
            await webApi.account.login(credentials).then((isLogin) => {
                if (isLogin == true) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Register' }]
                    });
                } else {
                    Alert.alert("Alerta", "Su usuario / contraseña no es valida");
                    actions.onChangeValue(formType.CONTRASENA, "");
                }
            });
        };
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={ColorTheme.primary} barStyle="light-content" />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible); }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.text_modal}>
                            Iniciar Sesion
                        </Text>
                        <View style={style.form}>
                            {form.map((inp, k) =>
                                <View key={k} style={style.form_input}>
                                    <FormInput
                                        input={inp}
                                        onValueChange={actions.onChangeValue}
                                        isPassword={inp.code == formType.CONTRASENA}
                                    />
                                </View>
                            )}
                            <RoundButtonPrimary
                                onPress={onLoginValidate}
                                text={"Ingresar"} />
                        </View>
                    </View>
                </View>
            </Modal>
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
    form: {
        padding: 20,
        width: "100%"
    },
    form_input: {
        width: "100%"
    },
    logo_image: {
        width: 280,
        height: 247,
        resizeMode: "stretch"
    },
    centeredView: {
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