import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BarStyleSheed } from "../../componets/barStyleSheed";
import { RoutesMenu } from "../../config/routes";
import { ColorTheme, MainTheme } from "../../theme/appTheme";
import { FlatButton } from "../../componets/flatButton";
import { faAtlas, faIdCard, faMapMarkedAlt, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { InitialConfig } from "../../config/initialConfig";

type Props = NativeStackScreenProps<RoutesMenu, 'Home'>;

const MenuScreen = ({ navigation, route }: Props) => {
    const { menu } = InitialConfig;

    const onPress = () => {
        navigation.navigate("Swich");
    }

    return (
        <SafeAreaView>
            <View style={MainTheme.backgroun_white}>
                <View style={style.main}>
                    <BarStyleSheed />
                    <Text style={style.title}>{menu.lblTitle}</Text>
                    <Text style={style.info}>{menu.lblComment}</Text>
                </View>
                <View style={style.container}>
                    <View style={style.row}>
                        <View style={style.row}>
                            <FlatButton onPress={onPress} text={menu.btnHistory} icon={faIdCard} />
                        </View>
                        <View style={style.row}>
                            <FlatButton onPress={onPress} text={menu.btnSwich} icon={faPowerOff} />
                        </View>
                    </View>
                    <View style={style.row}>
                        <View style={style.row}>
                            <FlatButton onPress={onPress} text={menu.btnGps} icon={faMapMarkedAlt} />
                        </View>
                        <View style={style.row}>
                            <FlatButton onPress={onPress} text={menu.btnZone} icon={faAtlas} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}


export default MenuScreen;

const style = StyleSheet.create({
    main: {
        flex: 1
    },
    title: {
        padding: 8,
        marginTop: 10,
        fontSize: 28,
        fontWeight: "800",
        color: ColorTheme.black,
        textAlign: "center"
    },
    info: {
        marginTop: 10,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 20,
        textAlign: "center",
        marginBottom: 10
    },
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: ColorTheme.backgroud,
        marginBottom: 30
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
});