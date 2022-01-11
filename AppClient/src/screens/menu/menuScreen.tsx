import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { Routes } from "../../config/routes";

type Props = NativeStackScreenProps<Routes, 'Menu'>;

const MenuScreen = ({ navigation, route }: Props) => {
    return (<>
        <Text>Menu</Text>
    </>)
}


export default MenuScreen;