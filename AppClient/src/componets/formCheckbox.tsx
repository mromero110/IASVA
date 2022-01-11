import React from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Checkbox } from "react-native-paper";

export interface IFormCheckBoxProps {
    text: string,
    checked: boolean,
    onValueChange: (value: boolean) => void
}

export const FormCheckBox = (props: IFormCheckBoxProps) => {
    const { text, checked, onValueChange } = props;
    const setChecked = () => {
        onValueChange(!checked);
    }

    return (
        <TouchableWithoutFeedback onPress={setChecked}>
            <View style={style.checkbox}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                />
                <Text style={style.text}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}


const style = StyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
    }
});