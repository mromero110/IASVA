import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { MainTheme } from "../theme/appTheme";


interface IRoundImageProps {
    image: ImageSourcePropType,
}

export const RoundImage = (props: IRoundImageProps) => {
    const { image } = props;
    return (
        <Image
            style={MainTheme.roundImage}
            source={image}
            resizeMode={"cover"}
        />
    );
}
