import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ColorTheme } from "../theme/appTheme";

export type HeaderTapType = "Today" | "Historical"

export interface HeaderTabProps {
    onTabSelect: (type: HeaderTapType) => void;
}

const HeaderTab = (props: HeaderTabProps) => {
    const [tab, setTab] = useState<HeaderTapType>("Today");

    const onTabSwichSelect = () => {
        let newTab = (tab == "Today" ? "Historical" : "Today") as HeaderTapType;
        setTab(newTab);
        props.onTabSelect(newTab);
    }

    return (
        <View style={style.container}>
            <View style={[style.tab, { backgroundColor: tab == "Today" ? ColorTheme.accent : ColorTheme.gray }]}>
                <TouchableOpacity onPress={onTabSwichSelect}>
                    <Text style={style.text}>HOY</Text>
                </TouchableOpacity>
            </View>
            <View style={[style.tab, { backgroundColor: tab == "Historical" ? ColorTheme.accent : ColorTheme.gray, }]}>
                <TouchableOpacity onPress={onTabSwichSelect}>
                    <Text style={[style.text]}>HISTORIAL</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}


export default HeaderTab;

const style = StyleSheet.create({
    container: {
        paddingTop: 40,
        flexDirection: "row",
        backgroundColor: ColorTheme.primary,
    },
    tab: {
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: ColorTheme.secondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,
        elevation: 8,
    },
    text: {
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    }
});