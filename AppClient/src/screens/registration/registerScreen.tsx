import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FormInput } from "../../componets/formInput";
import { FormCheckBox } from "../../componets/formCheckbox";
import { InitialConfig } from "../../config/initialConfig";
import { useFormValidator } from "../../hooks/useFormValidator";
import { ColorTheme, MainTheme } from "../../theme/appTheme";
import { IFormProp } from "../../models/FormProp";
import { RoundButtonPrimary } from "../../componets/roundbutton";

enum form {
    SERIAL,
    NOMBRE,
    RECUPERACION
}

const formConfig = [
    {
        code: form.SERIAL,
        name: InitialConfig.register.lblSerial,
        required: true,
        disabled: true
    }, {
        code: form.NOMBRE,
        name: InitialConfig.register.lblNombre,
        maxLength: 30,
        required: true,
    }, {
        code: form.RECUPERACION,
        name: InitialConfig.register.lblRecuperacion,
        maxLength: 60,
        required: true,
    }
] as IFormProp[];

const RegisterScreen = () => {
    const { form, actions } = useFormValidator(formConfig);
    const [checked, setChecked] = useState(true);
    const { register } = InitialConfig;
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={ColorTheme.primary} barStyle="light-content" />
            <View style={MainTheme.backgroun_white}>
                <ScrollView>
                    <View style={style.scanner}>
                        <View style={style.scanner_icon}>
                            <FontAwesomeIcon
                                icon={faCamera}
                                size={80}
                                color={ColorTheme.white} />
                        </View>
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
                        <FormCheckBox
                            text={register.chkFaceRecognition}
                            checked={checked}
                            onValueChange={setChecked} />
                        <View style={style.button}>
                            <RoundButtonPrimary text={register.btnRegister} />
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
        marginTop: 30
    }
});