import network
import uwebsockets.client
import ujson
from machine import Pin

LR = Pin(21, Pin.OUT)
LG = Pin(19, Pin.OUT)
LB = Pin(18, Pin.OUT)
LY = Pin(5, Pin.OUT)

def semaforo(r,g,b,y):
    LR.value(r)
    LG.value(g)
    LB.value(b)
    LY.value(y)
    print("blick => ", "ok")
    
def websocket():
    with uwebsockets.client.connect('ws://192.168.20.36:8080/JavaSocketServer/wsServer') as websocket:
        while True:
            resp = websocket.recv()
            if "Command" in resp:
                message = ujson.loads(resp)
                if message["Command"] == "leds":
                    leds = ujson.loads(message["Data"])
                    
                    y = leds["amarillo"]
                    r = leds["rojo"]
                    g = leds["verde"]
                    b = leds["azul"]
                    
                    semaforo(r, g, b, y)
                else:
                    print("mensaje => ", message)
                    
        
def do_connect(SSID, PASSWORD):
    global sta_if
    sta_if = network.WLAN(network.STA_IF)     # instancia el objeto -sta_if- para realizar la conexión en modo STA 
    if not sta_if.isconnected():              # si no existe conexión...
        sta_if.active(True)                       # activa el interfaz STA del ESP32
        sta_if.connect(SSID, PASSWORD)            # inicia la conexión con el AP
        print('Conectando a la red', SSID +"...")
        while not sta_if.isconnected():           # ...si no se ha establecido la conexión...
            pass                                  # ...repite el bucle...
    print('Configuración de red (IP/netmask/gw/DNS):', sta_if.ifconfig())
    websocket()
            
semaforo(0,0,0,0)
do_connect("Sarah Sophia", "SarahSophia1235")     # RELLENAR CON EL  nombre/clave_de_red





