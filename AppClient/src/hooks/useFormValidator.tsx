import { useState } from "react";
import { IFormProp } from "../models/FormProp";

export const useFormValidator = (initialvalue: IFormProp[]) => {

    const [form, setForm] = useState<IFormProp[]>(initialvalue);

    // cambia el valor de un item en especifico del formulario
    const onChangeValue = (code: number, value: string) => {
        const list = [...form];
        const index = list.findIndex(m => m.code == code);
        if (index > -1) {
            list[index].value = value;
            setForm(list);
        }
    }

    // valida si no hay campos vacios
    const validateForm = (value: string | undefined) => {
        return value !== undefined && value.trim().length > 0;
    }

    // valida si todos los campos del formulario que tienen
    // un requerimiento se encuentran completados
    const validate = () => {
        let flag = true;
        form.forEach(m => {
            if (m.required == true && validateForm(m.value) == false) {
                flag: false;
            }
        })
        return flag;
    }


    return {
        form,
        actions: {
            setForm,
            onChangeValue,
            validate
        }
    }
}