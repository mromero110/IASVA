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
    },
    menu: {
        lblTitle: "MOTO FUS483 - ESP32",
        lblComment: "Ten en cuenta que, si el dispositivo no cuenta con señal GSM, debes estar aproximadamente a menos de 20 metros del vehículo para realizar una conexión directa",
        btnHistory: "Perfiles",
        btnSwich: "Interruptor",
        btnGps: "Ubicacion",
        btnZone: "Zona Segura"
    }
}