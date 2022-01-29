import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Checkbox } from "react-native-paper";

export interface IFormCheckBoxProps {
    text: string,
    checked: boolean,
    onValueChange: (value: boolean) => void
}

export const FormCheckBox = (props: IFormCheckBoxProps) => {
    const { text, checked, onValueChange } = props;
    const [value, setValue] = useState(checked);

    useEffect(() => {
        setValue(checked);
    }, [checked]);

    const setChecked = () => {
        onValueChange(!value);
        setValue(!value);
    }

    return (
        <TouchableWithoutFeedback onPress={setChecked}>
            <View style={style.checkbox}>
                <Checkbox
                    status={value ? 'checked' : 'unchecked'}
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