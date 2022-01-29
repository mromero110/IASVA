import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ColorTheme } from "../theme/appTheme"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

interface IFlatButtonProps {
    icon: IconProp,
    text: string,
    onPress: () => void;
}

export const FlatButton = (props: IFlatButtonProps) => {
    const { icon, text, onPress } = props;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={style.container}>
                <View style={style.cell}>
                    <FontAwesomeIcon
                        icon={icon}
                        size={70}
                        color={ColorTheme.primary} />
                    <Text style={style.text}>
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: ColorTheme.white,
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderRadius: 10,
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
    cell: {
        width: 120,
        alignItems: "center",
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        flexWrap: "nowrap"
    }
});