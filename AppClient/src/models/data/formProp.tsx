import { KeyboardTypeOptions } from "react-native";

export interface IFormProp {
    code: number,
    keyboard?: KeyboardTypeOptions,
    name: string,
    maxLength?: number,
    value?: string,
    required?: boolean,
    disabled?: boolean
}
