import React from "react"
import { ColorTheme } from "../theme/appTheme"
import { RoundButton } from "./roundButton"

export const RoundButtonSecondary = (props: IRoundButtonStyleProps) => {
    return <RoundButton
        text={props.text}
        onPress={props.onPress}
        borderColor={ColorTheme.primary}
        background={ColorTheme.transparent}
        textColor={ColorTheme.primary} />
}