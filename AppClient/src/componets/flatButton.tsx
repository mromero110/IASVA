import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ColorTheme } from "../theme/appTheme"

interface IFlatButtonProps {
    icon: IconProp,
    text: string
}

export const FlatButton = (props: IFlatButtonProps) => {
    const { icon, text } = props;
    return (
        <View style={style.container}>
            <FontAwesomeIcon
                icon={icon}
                size={70}
                color={ColorTheme.accent} />
            <Text style={style.text}>
                {text}
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        minWidth: 160,
        backgroundColor: ColorTheme.white,
        paddingVertical: 40,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: "center",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold"
    }
});