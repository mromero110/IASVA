import { UserDevice } from "./userDevice";

export interface UserCredentials extends UserDevice {
    email: string
    password: string
}