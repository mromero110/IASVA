import network
import uwebsockets.client
import ujson
from machine import Pin

alarma = Pin(21, Pin.OUT)
bloqueo = Pin(19, Pin.OUT)

servidorWs = 'ws://192.168.20.36:8080/JavaSocketServer/wsServer'

def setEstado(alarm,bloq):
    alarma.value(alarm)
    bloqueo.value(bloq)
    
def websocket():
    with uwebsockets.client.connect(servidorWs) as websocket:
        while True:
            resp = websocket.recv()
            if "Command" in resp:
                message = ujson.loads(resp)
                if message["Command"] == "bloqueo":
                    
                    leds = ujson.loads(message["Data"])
                    ala = leds["alarma"]
                    blo = leds["bloqueo"]
                    setEstado(ala, blo)
                    
                else:
                    print("mensaje => ", message)
                    
        
def do_connect(SSID, PASSWORD):
    global sta_if
    sta_if = network.WLAN(network.STA_IF)     
    if not sta_if.isconnected():              
        sta_if.active(True)                       
        sta_if.connect(SSID, PASSWORD)            
        print('Conectando a la red', SSID +"...")
        while not sta_if.isconnected():           
            pass                                  
    print('Configuración de red (IP/netmask/gw/DNS):', sta_if.ifconfig())
    websocket()
            
semaforo(0,0,0,0)
do_connect("Sarah Sophia", "SarahSophia1235")    





