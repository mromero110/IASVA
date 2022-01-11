import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ColorTheme } from "../theme/appTheme";

interface IimageCodeProps {
    step: number
}

interface ICodeProps {
    marked: boolean
}

const ImageCode = (props: IimageCodeProps) => {
    const { step } = props
    return (
        <View style={style.inline}>
            <Code marked={1 <= step} />
            <Code marked={2 <= step} />
            <Code marked={3 <= step} />
            <Code marked={4 <= step} />
        </View>
    );
}

const Code = (props: ICodeProps) => {
    return (
        <View style={style.code_container}>
            <View style={style.center}>
                {props.marked && <View style={style.code_circle} />}
            </View>
            <View style={style.code_line} />
        </View>
    );
}

export default ImageCode;

const style = StyleSheet.create({
    inline: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 10
    },
    center: {
        alignItems: "center",
        height: 40,
    },
    code_container: {
        width: 55,
        margin: 5,
        paddingTop: 20
    },
    code_circle: {
        backgroundColor: ColorTheme.accent,
        width: 18,
        height: 18,
        borderRadius: 50,
        marginBottom: 20
    },
    code_line: {
        height: 4,
        backgroundColor: "gray"
    }
});