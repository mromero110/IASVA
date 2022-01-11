import React from "react";
import { View } from "react-native";

interface IPassWordKeyBoardProps {
    onConfirm: () => void
    onPress: (val: number) => void
    onErase: () => void;
}

interface INumberPadProps {
    text: string
}

const PassWordKeyBoard = (props: IPassWordKeyBoardProps) => {
    return (
        <View>

        </View>
    );
}


const NumberPad = (props: INumberPadProps) => {
    return (<></>)
}


export default PassWordKeyBoard;