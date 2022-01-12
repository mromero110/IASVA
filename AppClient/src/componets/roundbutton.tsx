import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MainTheme } from "../theme/appTheme";

interface IRoundButtonProps {
    text: string,
    textColor: string,
    background: string,
    borderColor: string
    onPress?: () => void
}

export const RoundButton = (props: IRoundButtonProps) => {
    const { text, onPress, textColor, background, borderColor } = props;
    return (
        <TouchableOpacity
            style={[MainTheme.roundButton, {
                backgroundColor: background,
                borderColor: borderColor
            }]}
            onPress={onPress}>
            <Text style={[MainTheme.button, { color: textColor }]}>
                {text}
            </Text>
        </TouchableOpacity >
    );
}
