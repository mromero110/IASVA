import React, { useEffect, useState } from "react";
import { Routes } from "../config/routes";
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FormInput } from "../componets/formInput";
import { InitialConfig, WebApiConfig } from "../config/initialConfig";
import { useFormValidator } from "../hooks/useFormValidator";
import { ColorTheme, MainTheme } from "../theme/appTheme";
import { IFormProp } from "../models/data/formProp";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoundButtonPrimary } from "../componets/roundButtonStyle";
import { useStorage } from "../hooks/useStorage";
import { useWebApi } from "../hooks/useWebApi";
import { useIsFocused } from "@react-navigation/native";

enum formType {
    SERIAL,
    NOMBRE,
    PLACA,
    DESCRIPCION
}

const formConfig = [
    {
        code: formType.SERIAL,
        name: InitialConfig.register.lblSerial,
        required: true,
        disabled: true
    }, {
        code: formType.NOMBRE,
        name: InitialConfig.register.lblNombre,
        maxLength: 30,
        required: true,
    }, {
        code: formType.PLACA,
        name: "Placa",
        maxLength: 10,
        required: true,
    }, {
        code: formType.DESCRIPCION,
        name: "Descripción del vehiculo",
        maxLength: 100,
        required: true,
    }
] as IFormProp[];

type Props = NativeStackScreenProps<Routes, 'Register'>;

const RegisterScreen = ({ navigation, route }: Props) => {
    const { form, actions } = useFormValidator(formConfig);
    const { register } = InitialConfig;
    const store = useStorage();
    const webApi = useWebApi(WebApiConfig);
    const isFocused = useIsFocused();

    const saveDevice = async () => {
        return webApi.device.save({
            Descripcion: actions.getForm(formType.DESCRIPCION) || "",
            Serial: actions.getForm(formType.SERIAL) || "",
            Nombre: actions.getForm(formType.NOMBRE) || "",
            Placa: actions.getForm(formType.PLACA) || "",
        }).then(response => response);
    }

    const onNext = async () => {
        if (actions.validate()) {
            const result = await saveDevice();
            if (result.Status == false) {
                Alert.alert("Alerta", "No es posible realizar la asignación, el código no existe ó ya fue asignado");
            } else {
                await store.set("serial", {
                    serial: actions.getForm(formType.SERIAL),
                    name: actions.getForm(formType.PLACA)
                });
                navigation.navigate("PassWord")
            }
        } else {
            Alert.alert("Alerta", "Complete todos los campos antes de continuar")
        }
    }

    const setCodeAsyncStorage = async () => {
        const code = await store.get("code").then(result => result);
        if (code !== null && code !== undefined) {
            if (code.data !== code) {
                actions.onChangeValue(formType.SERIAL, code.data);
            }
        }
    }

    useEffect(() => {
        setCodeAsyncStorage();
    }, [isFocused]);

    const onTouchCamera = () => {
        navigation.push("QrReader");
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={ColorTheme.primary} barStyle="light-content" />
            <View style={MainTheme.backgroun_white}>
                <ScrollView>
                    <View style={style.scanner}>
                        <TouchableOpacity onPress={onTouchCamera}>
                            <View style={style.scanner_icon}>
                                <FontAwesomeIcon
                                    icon={faCamera}
                                    size={80}
                                    color={ColorTheme.white} />
                            </View>
                        </TouchableOpacity>
                        <Text style={style.scanner_label}>
                            {register.lblScanner}
                        </Text>
                    </View>
                    <View style={MainTheme.container}>
                        <View style={style.form}>
                            {form.map((inp, k) =>
                                <View key={k}>
                                    <FormInput
                                        input={inp}
                                        onValueChange={actions.onChangeValue} />
                                </View>
                            )}
                        </View>
                        <View style={style.button}>
                            <RoundButtonPrimary onPress={onNext} text={register.btnRegister} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>)
}

export default RegisterScreen;

const style = StyleSheet.create({
    scanner: {
        padding: 20,
        minHeight: 250,
        alignItems: "center",
        backgroundColor: ColorTheme.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    scanner_icon: {
        borderColor: ColorTheme.white,
        borderWidth: 3,
        padding: 28,
        borderRadius: 200
    },
    scanner_label: {
        marginTop: 20,
        fontSize: 22,
        color: ColorTheme.white,
        fontWeight: "bold",
        textAlign: "center"
    },
    form: {
        padding: 8,
        marginBottom: 10
    },
    button: {
        paddingHorizontal: 4,
        marginTop: 10
    }
});