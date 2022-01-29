import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Routes, RoutesMenu } from './src/config/routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppTheme, ColorTheme } from './src/theme/appTheme';
import PassWordScreen from './src/screens/passwordScreen';
import MenuScreen from './src/screens/menuScreen';
import SwichScreen from './src/screens/swichScreen';
import HistoryScreen from './src/screens/historicalScreen';
import DeviceScreen from './src/screens/deviceScreen';
import LoginScreen from './src/screens/loginScreen';
import RegisterScreen from './src/screens/registerScreen';
import GpsScreen from './src/screens/gpsScreen';
import SecureZoneScreen from './src/screens/secureZoneScreen';

const Stack = createNativeStackNavigator<Routes>();
const Drawer = createDrawerNavigator<RoutesMenu>();

const noHeader = { headerShown: false };
const options = {
  headerTintColor: ColorTheme.white,
  headerStyle: { backgroundColor: ColorTheme.primary },
}

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      screenOptions={options}>
      <Drawer.Screen name="Home" component={MenuScreen} options={{ title: "Menu Principal" }} />
      <Drawer.Screen name="History" component={HistoryScreen} options={{ title: "Historial" }} />
      <Drawer.Screen name="Gps" component={GpsScreen} options={{ title: "Ubicación" }} />
      <Drawer.Screen name="Swich" component={SwichScreen} options={{ title: "Protección" }} />
      <Drawer.Screen name="SecureZone" component={SecureZoneScreen} options={{ title: "Zonas Seguras" }} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={options}>
          <Stack.Screen name={"Login"} component={LoginScreen} options={noHeader} />
          <Stack.Screen name={"Register"} component={RegisterScreen} options={noHeader} />
          <Stack.Screen name={"QrReader"} component={DeviceScreen} options={{ title: "Codigo del dispositivo" }} />
          <Stack.Screen name={"PassWord"} component={PassWordScreen} options={{ title: "Registre una contraseña" }} />
          <Stack.Screen name={"Main"} component={DrawerMenu} options={noHeader} />
        </Stack.Navigator>
      </NavigationContainer >
    </PaperProvider>
  );
};

export default App;
