import { useState } from "react";
import { IFormProp } from "../models/data/formProp";

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
    const isEmpty = (value: string | undefined) => {
        return value == undefined || value.trim().length < 1;
    }

    const getForm = (code: number) => {
        const index = form.findIndex(m => m.code == code);
        if (index > -1) {
            return form[index].value;
        }
    }

    // valida si todos los campos del formulario que tienen
    // un requerimiento se encuentran completados
    const validate = () => {
        let flag = true;
        form.forEach(m => {
            if (m.required == true && isEmpty(m.value)) {
                flag = false;
            }
        })
        return flag;
    }

    const clear = () => {
        const list = [...form];
        const newlist = list.map(m => {
            m.value = "";
            return m;
        });
        setForm(newlist);
    }

    return {
        form,
        actions: {
            getForm,
            onChangeValue,
            validate,
            clear
        }
    }
}