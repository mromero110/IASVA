import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";


export const ColorTheme = {
    primary: "#448AFF",
    secondary: "#0F1F41",
    accent: "#FF5722",
    white: "#FFFFFF",
    black: "black",
    transparent: "transparent",
    gray: "#919191",
    backgroud: "#EEEEEE",
    red: "red"
}

export const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: ColorTheme.primary,
        accent: ColorTheme.accent,
    },
};

export const MainTheme = StyleSheet.create({
    backgroun_white: {
        width: '100%', height: '100%',
        backgroundColor: ColorTheme.white
    },
    input: {
        borderBottomWidth: 0.5
    },
    button: {
        padding: 8,
        fontSize: 18,
        fontWeight: "bold"
    },
    roundImage: {
        borderRadius: 150
    },
    container: {
        margin: 16,
        flex: 1
    },
    roundButton: {
        borderRadius: 150,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 180,
        alignItems: "center",
        marginVertical: 10,
        borderWidth: 3
    }
});

