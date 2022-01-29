import React, { ReactNode } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { IFormProp } from "../models/data/formProp";
import { ColorTheme } from "../theme/appTheme";

export interface IFormInputProps {
    input: IFormProp
    onValueChange: (code: number, value: string) => void
    displayName?: ReactNode;
    isPassword?: boolean
}

export const FormInput = (props: IFormInputProps) => {
    const { input, onValueChange, displayName, isPassword = false } = props;
    const { keyboard = "default", disabled, } = input;
    const editable = disabled != true;

    const onChangeText = (text: string) => {
        onValueChange(input.code, text);
    }

    return (
        <View style={style.container}>
            {displayName && <View style={style.label_custom}>
                {displayName}
            </View>}
            {!displayName &&
                <Text style={style.label}>
                    {input.name}
                </Text>}
            <View style={[style.border, !editable && style.disabled]}>
                <TextInput
                    editable={editable}
                    style={style.text}
                    value={input.value}
                    onChangeText={onChangeText}
                    keyboardType={keyboard}
                    maxLength={input.maxLength}
                    secureTextEntry={isPassword}
                />
            </View>
        </View>
    );
}


const style = StyleSheet.create({
    container: {
        paddingBottom: 16,
    },
    text: {
        padding: 8,
        fontSize: 14,
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        fontWeight: "bold"
    },
    label_custom: {
        marginBottom: 10
    },
    border: {
        borderColor: "#919191",
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: ColorTheme.white
    },
    disabled: {
        backgroundColor: "#f3f2f0"
    }
});