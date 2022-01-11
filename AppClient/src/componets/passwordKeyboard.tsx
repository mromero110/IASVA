import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBackward, faCheck, faCheckCircle, faEraser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ColorTheme } from "../theme/appTheme";

interface IPassWordKeyBoardProps {
    onConfirm: () => void
    onPress: (val: number) => void
    onErase: () => void;
}

interface INumberPadProps {
    val: number
    onPress: (val: number) => void
}

interface IActionPadProps {
    icon: IconProp,
    onPress: () => void,
    color: string
}

const PassWordKeyBoard = (props: IPassWordKeyBoardProps) => {

    const { onConfirm, onErase, onPress } = props;

    return (
        <View style={style.content}>
            <View style={style.row}>
                <NumberPad val={1} onPress={onPress} />
                <NumberPad val={2} onPress={onPress} />
                <NumberPad val={3} onPress={onPress} />
            </View>
            <View style={style.row}>
                <NumberPad val={4} onPress={onPress} />
                <NumberPad val={5} onPress={onPress} />
                <NumberPad val={6} onPress={onPress} />
            </View>
            <View style={style.row}>
                <NumberPad val={7} onPress={onPress} />
                <NumberPad val={8} onPress={onPress} />
                <NumberPad val={9} onPress={onPress} />
            </View>
            <View style={style.row}>
                <ActionPad color={ColorTheme.gray} icon={faCheck} onPress={onConfirm} />
                <NumberPad val={0} onPress={onPress} />
                <ActionPad color={ColorTheme.gray} icon={faEraser} onPress={onErase} />
            </View>
        </View>
    );
}

const ActionPad = (props: IActionPadProps) => {
    const { icon, onPress, color } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[style.round, { backgroundColor: color }]}>
                <FontAwesomeIcon
                    icon={icon}
                    size={28}
                    color={ColorTheme.white} />
            </View>
        </TouchableOpacity>
    );
}

const NumberPad = (props: INumberPadProps) => {
    const onPress = () => {
        props.onPress(props.val);
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style.round}>
                <Text style={style.text}>
                    {props.val}
                </Text>
            </View>
        </TouchableOpacity>
    );
}


export default PassWordKeyBoard;

const style = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 16
    },
    content: {
        marginHorizontal: 8
    },
    round: {
        height: 70,
        width: 70,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: ColorTheme.primary
    },
    text: {
        fontSize: 36,
        fontWeight: "bold",
        color: ColorTheme.white
    }
});