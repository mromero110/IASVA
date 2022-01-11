import React from "react";
import { Text, View } from "react-native";

interface IimageCodeProps {
    length: number
    step: number
}

interface ICodeProps {
    marked: boolean
}

const ImageCode = (props: IimageCodeProps) => {
    const { step, length } = props
    const renderCode = () => {
        const list = [];
        for (let index = 0; index < length; index++) {
            list.push(
                <Code marked={index >= step} />
            )
        }
        return list;
    }

    return (
        <View>
            {renderCode()}
        </View>
    );
}

const Code = (props: ICodeProps) => {
    return (
        <View>
            <Text>
                {props.marked ? "X" : ""}
            </Text>
        </View>
    );
}

export default ImageCode;