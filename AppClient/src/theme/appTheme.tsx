import { StyleSheet } from "react-native";

export const ColorTheme = {
    primary: "#448AFF",
    white: "#FFFFFF",
    transparent: "transparent"
}

export const MainTheme = StyleSheet.create({
    button: {
        padding: 8,
        fontSize: 18
    },
    roundImage: {
        borderRadius: 150
    },
    roundButton: {
        borderRadius: 150,
        backgroundColor: "red",
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 180,
        alignItems: "center",
        marginVertical: 10,
        borderWidth: 3
    }
});

export const LoginTheme = StyleSheet.create({
    background: {
        width: '100%', height: '100%'
    },
    container: {
        margin: 26,
        flex: 1,
    },
    button_container: {
        alignItems: "center"
    },
    logo_container: {
        flex: 1,
        alignSelf: "center",
        marginTop: 20
    },
    logo_image: {
        width: 240,
        height: 240
    }
});
