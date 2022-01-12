import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export const BarStyleSheed = () => {
    var { width } = Dimensions.get('window');

    return (
        <View style={style.wrapper}>
            <Image source={require("../assets/images/borderstyle.png")}
                style={style.main} width={width} height={20} />
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        width: "100%",
        top: -1
    },
    main: {
        resizeMode: "stretch"
    },
});