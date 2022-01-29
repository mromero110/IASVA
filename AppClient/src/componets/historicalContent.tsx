
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { WebApiConfig } from "../config/initialConfig";
import { useStorage } from "../hooks/useStorage";
import { useWebApi } from "../hooks/useWebApi";
import { DeviceActionResponse } from "../models/response/deviceActionResponse";
import { ColorTheme } from "../theme/appTheme";
import { HeaderTapType } from "./headerTab";

export interface HistoricalContentProps {
    tab: HeaderTapType
}

export interface PaginationProps {
    pageMax: number,
    page: number
}

const HistoricalContent = (props: HistoricalContentProps) => {
    const { tab } = props;
    const [data, setData] = useState<DeviceActionResponse[]>([]);
    const webapi = useWebApi(WebApiConfig);
    const store = useStorage();

    const setDeviceToday = async () => {
        const list = await webapi.device.list();
        const data = await store.get("serial");
        const current = list.find(m => m.Serial == data.serial);
        if (current) {
            const list = await webapi.actions.getActionToday(current.Id);
            setData(list);
        }
    }

    const setDeviceHistory = async () => {
        const list = await webapi.device.list();
        const data = await store.get("serial");
        const current = list.find(m => m.Serial == data.serial);
        if (current) {
            const list = await webapi.actions.getActionHistory(current.Id);
            setData(list);
        }
    }

    useEffect(() => {
        if (tab == "Historical") {
            setDeviceToday();
        } else {
            setDeviceHistory();
        }
    }, [tab]);

    const renderItem = ({ item }: { item: DeviceActionResponse }) => {
        const date = item.Genera.split("T");
        return <View style={{ paddingHorizontal: 20 }}>
            <View style={[style.row, style.inline]}>
                <View style={style.button_container}>
                    <View style={style.button}></View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={style.inline}>
                        <Text style={style.title}>{item.Estado}</Text>
                        <Text>{date[1]}</Text>
                    </View>
                    <Text>
                        {date[0] + " | " + item.Zona}
                    </Text>
                </View>
            </View >
        </View>
    };

    const getPaginate = () => {
        const len = data.length;
        const maxPagesPerRow = 0;
        if (len == 0) return 1;
        else {
            return Math.ceil(len / maxPagesPerRow);
        }
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index + ""}
            renderItem={renderItem} />
    );
}


const style = StyleSheet.create({
    button: {
        width: 25,
        height: 25,
        backgroundColor: ColorTheme.primary,
        borderRadius: 50,
        marginRight: 20,
    },
    button_container: {
        paddingTop: 6
    },
    paginate: {
        paddingHorizontal: 6,
        paddingVertical: 8,
        minWidth: 30,
        borderColor: ColorTheme.backgroud,
        borderWidth: 1,
    },
    paginate_text: {
        fontSize: 14,
        textAlign: "center"
    },
    center: {
        marginTop: 10
    },
    container: {
        flex: 1,
        backgroundColor: ColorTheme.white,
        paddingVertical: 20,
    },
    inline: {
        flexDirection: "row",
        alignContent: "center"
    },
    row: {
        borderBottomWidth: 1,
        paddingVertical: 16,
        borderBottomColor: ColorTheme.backgroud
    },
    title: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 14
    }
});

export default HistoricalContent;