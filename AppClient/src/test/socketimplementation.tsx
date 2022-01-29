import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RoundButton } from "../componets/roundButton";
import { RoutesMenu } from "../config/routes";
import { ColorTheme } from "../theme/appTheme";


type Props = NativeStackScreenProps<RoutesMenu, 'Swich'>;

interface IButtonColor {
    nombre: string,
    color: string,
    activo: boolean
}

const newboton = (nombre: string, color: string): IButtonColor => {
    return {
        activo: false,
        color: color,
        nombre: nombre
    }
}


const SocketScreen = ({ navigation, route }: Props) => {

    const [estado, setEstado] = useState("");
    const [botones, setBotones] = useState<IButtonColor[]>([])
    const [sensor, setSensor] = useState("");
    const [wsId, setwsId] = useState("");

    const [socket, setSocket] = useState<WebSocket>();
    const [reconect, setReconnect] = useState(0);

    useEffect(() => {
        const list = [
            newboton("rojo", "red"),
            newboton("verde", "green"),
            newboton("azul", "blue"),
            newboton("amarillo", "yellow")] as IButtonColor[];
        setBotones(list);
    }, [])

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.20.36:8080/JavaSocketServer/wsServer');

        ws.onopen = () => {
            console.log('Websocket opened.');
            setEstado("Esperando Conexión");
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.Command === "registrado") {
                setwsId(data.To);
                setEstado("Conectado");
                console.log('Websocket conected.');
                ws.send("Hola desde App")
            }else{
                console.log(data.Data);
            }
        };

        ws.onerror = (e) => {
            console.log(`Error: ${e.message}`);
            setEstado("Error");
        };

        ws.onclose = (e) => {
            console.log(e.code, e.reason);
            setEstado("Desconectado")
            setTimeout(() => {
                setReconnect(reconect + 1);
                console.log("reconectando timeout....")
            }, 2000)
        };

        setSocket(ws);
    }, [reconect])

    const parseBotones = (list: IButtonColor[]) => {
        return {
            From: wsId,
            To: "",
            Command: "leds",
            Data: {
                rojo: list[0].activo,
                verde: list[1].activo,
                azul: list[2].activo,
                amarillo: list[3].activo,
            },
        }
    }

    const toggle = (nombre: string) => {
        const list = [...botones];

        list.forEach(m => {
            if (m.nombre === nombre) {
                m.activo = !m.activo;
            }
            return m;
        });

        if (socket) {
            if (socket.readyState == WebSocket.CLOSED) {
                setReconnect(reconect + 1);
                console.log("reconectando click....")
            } else {
                const obj = parseBotones(list);
                const data = JSON.stringify(obj);
                socket.send(data);
            }
        }
        setBotones(list);
    }

    return (
        <View style={style.container}>
            <Text style={style.text}>
                {estado}
            </Text>
            <Text style={style.text}>
                {sensor}
            </Text>
            {
                botones.map((b, k) => {
                    return (<View key={k} style={style.separator}>
                        <TouchableOpacity onPress={() => { toggle(b.nombre) }}>
                            <RoundButton
                                text={b.nombre}
                                textColor={"black"}
                                background={!b.activo ? b.color : ColorTheme.backgroud}
                                borderColor={b.color} />
                        </TouchableOpacity>
                    </View>)
                })
            }
        </View >
    )
}


export default SocketScreen;

const style = StyleSheet.create({
    container: {
        padding: 8
    },

    text: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    separator: {
        padding: 8
    }
});