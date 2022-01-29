import React from "react";
import { Text } from "react-native";

export interface LoadingProps {
    isLoading: boolean
}

const Loading = (props: LoadingProps) => {

    const { isLoading } = props;
    return (
        <Text>
            {isLoading ? "Cargando..." : ""}
        </Text>
    );
}

export default Loading;