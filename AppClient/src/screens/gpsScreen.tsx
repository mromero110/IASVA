import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { WebApiConfig } from "../config/initialConfig";
import { RoutesMenu } from "../config/routes";
import { useStorage } from "../hooks/useStorage";
import { useWebApi } from "../hooks/useWebApi";
import { mapStyle } from "./mapStyle";
import { Marker } from "react-native-maps";

type Props = NativeStackScreenProps<RoutesMenu, 'Gps'>;

export interface IMarkers {
    Latitud: string,
    Longitud: string
}

const GpsScreen = ({ navigation, route }: Props) => {

    const [markers, setMarker] = useState<IMarkers[]>([]);
    const webApi = useWebApi(WebApiConfig);
    const store = useStorage();
    const [region, setRegion] = useState<Region>();

    const setRegionItem = (latitud: number, longitud: number) => {
        setRegion({
            latitude: latitud,
            longitude: longitud,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
        });
    }

    const setDeviceList = async () => {
        const list = await webApi.device.list();
        const data = await store.get("serial");
        const current = list.find(m => m.Serial == data.serial);
        if (current) {
            const list = await webApi.gps.list(current.Id);
            if (list.length > 5) {
                const newlist = [];
                newlist.push(list[list.length - 5]);
                newlist.push(list[list.length - 4]);
                newlist.push(list[list.length - 3]);
                newlist.push(list[list.length - 2]);
                newlist.push(list[list.length - 1]);
                setMarker(newlist);
            } else {
                setMarker(list);
            }
            if (list.length > 0) {
                const item = list[list.length - 1];
                setRegionItem(parseFloat(item.Latitud), parseFloat(item.Longitud));
            } else {
                setRegionItem(4.58906, -74.17381);
            }
        }
    }

    useEffect(() => {
        setDeviceList();
        console.log("Set device list...");
    }, []);

    return <View style={styles.container}>
        <MapView
            customMapStyle={mapStyle}
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            initialRegion={region}
            mapType="standard">
            {markers.map((marker, index) => {
                return <Marker
                    key={index}
                    coordinate={{
                        latitude: parseFloat(marker.Latitud),
                        longitude: parseFloat(marker.Longitud),
                    }}
                />
            })}
        </MapView>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default GpsScreen;