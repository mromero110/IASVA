import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import HeaderTab, { HeaderTapType } from "../componets/headerTab";
import HistoricalContent from "../componets/historicalContent";
import { RoutesMenu } from "../config/routes";
import { ColorTheme } from "../theme/appTheme";

type Props = NativeStackScreenProps<RoutesMenu, 'History'>;

const HistoryScreen = ({ navigation, route }: Props) => {
    const [tab, setTab] = useState<HeaderTapType>("Today");
    const onTabSelect = (type: HeaderTapType) => {
        setTab(type)
    }
    return (
        <>
            <HeaderTab onTabSelect={onTabSelect} />
            <View style={style.content}>
                <HistoricalContent tab={tab} />
            </View>
        </>
    );
}

export default HistoryScreen;

const style = StyleSheet.create({
    content: {
        backgroundColor: ColorTheme.white,
        flex: 1
    }
});