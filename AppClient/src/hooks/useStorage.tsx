import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageKey = "login" | "code" | "token" | "time" | "serial";


export const useStorage = () => {

    const get = async (key: StorageKey) => {
        try {
            const jsonValue = await AsyncStorage.getItem('@' + key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    const set = async (key: StorageKey, data: any) => {
        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem('@' + key, jsonValue)
        } catch (e) {
            // saving error
        }
    }

    return {
        get,
        set
    }
}