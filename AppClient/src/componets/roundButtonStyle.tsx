import React from "react"
import { ColorTheme } from "../theme/appTheme"
import { RoundButton } from "./roundButton"

interface IRoundButtonStyleProps {
    text: string,
    onPress?: () => void
}

export const RoundButtonPrimary = (props: IRoundButtonStyleProps) => {
    return <RoundButton
        text={props.text}
        onPress={props.onPress}
        borderColor={ColorTheme.primary}
        background={ColorTheme.primary}
        textColor={ColorTheme.white} />
}

export const RoundButtonSecondary = (props: IRoundButtonStyleProps) => {
    return <RoundButton
        text={props.text}
        onPress={props.onPress}
        borderColor={ColorTheme.primary}
        background={ColorTheme.secondary}
        textColor={ColorTheme.primary} />
}