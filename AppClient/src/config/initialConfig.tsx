import { IFormProp } from "../models/FormProp"

export const InitialConfig = {
    // Parametros de la pantalla login
    login: {
        btnLogin: "Iniciar Sesión",
        btnSetup: "Configuración",
    },
    register: {
        lblScanner: "Pulsar para canear el código \ndel dispositivo",
        lblSerial: "Codigo del dispositivo",
        lblNombre: "Nombre",
        lblRecuperacion: "Correo de recuperación",
        chkFaceRecognition: "Habilitar reconocimiento facial",
        btnRegister: "Continuar"
    },
    qrReader: {
        lblQrTitle: "REGISTRO ESCANEADO",
        lblCode: "El codigo se encuentra disponible",
        lblSerial: "Serial del dispositivo",
        lblInfo: "Al pulsar continuar se registrará el codigo \nen el dispositivo",
        btnNext: "Guardar"
    }
}