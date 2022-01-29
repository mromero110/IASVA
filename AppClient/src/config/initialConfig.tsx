export const InitialConfig = {
    // Parametros de la pantalla login
    login: {
        btnLogin: "Iniciar Sesión",
        btnSetup: "Configuración",
    },
    register: {
        lblScanner: "Pulsar para obtener el código \ndel dispositivo",
        lblSerial: "Código del dispositivo",
        lblNombre: "Nombre",
        lblRecuperacion: "Correo de recuperación",
        chkFaceRecognition: "Habilitar reconocimiento facial",
        btnRegister: "Continuar"
    },
    qrReader: {
        lblQrTitle: "Verificación de código QR",
        lblCode: "Ingrese el código del dispositivo",
        lblSerial: "Serial del telefono",
        lblInfo: "Pulsar para registrar codigo del dispositivo el telefono",
        btnNext: "Guardar"
    },
    menu: {
        lblTitle: "MOTO FUS483 - ESP32",
        lblComment: "Ten en cuenta que, si el dispositivo no cuenta con señal GSM, debes estar aproximadamente a menos de 20 metros del vehículo para realizar una conexión directa",
        btnHistory: "Historico",
        btnSwich: "Protección",
        btnGps: "Ubicación",
        btnZone: "Zona Segura"
    }
}

export const WebApiConfig = {
    baseUrl: "http://isvaiot-001-site1.ftempurl.com",
}