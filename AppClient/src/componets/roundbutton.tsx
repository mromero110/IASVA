import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ColorTheme, MainTheme } from "../theme/appTheme";

interface IRoundButtonProps {
    text: string,
    textColor: string,
    background: string,
    borderColor: string
    onPress?: () => void
}

interface IRoundButtonStyleProps {
    text: string,
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

export const RoundButtonPrimary = (props: IRoundButtonStyleProps) => {
    return <RoundButton
        text={props.text}
        onPress={props.onPress}
        borderColor={ColorTheme.primary}
        background={ColorTheme.primary}
        textColor={ColorTheme.white} />
}

export const RoundButtonSecondary = (props: IRoundButtonStyleProps) => {
    return <RoundButton
        text={props.text}
        onPress={props.onPress}
        borderColor={ColorTheme.primary}
        background={ColorTheme.transparent}
        textColor={ColorTheme.primary} />
}