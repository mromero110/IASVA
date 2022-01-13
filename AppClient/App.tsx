import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/login/loginScreen';
import RegisterScreen from './src/screens/registration/registerScreen';
import { Routes, RoutesMenu } from './src/config/routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppTheme, ColorTheme } from './src/theme/appTheme';
import QrReaderScreen from './src/screens/security/qrReaderScreen';
import PassWordScreen from './src/screens/security/passwordScreen';
import MenuScreen from './src/screens/menu/menuScreen';
import SwichScreen from './src/screens/modules/swich/swichScreen';

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
      <Drawer.Screen name="Home" component={MenuScreen} />
      <Drawer.Screen name="History" component={RegisterScreen} />
      <Drawer.Screen name="Gps" component={RegisterScreen} />
      <Drawer.Screen name="Swich" component={SwichScreen} />
      <Drawer.Screen name="SecureZone" component={RegisterScreen} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={options}>
          <Stack.Screen name={"Login"} component={LoginScreen} options={noHeader} />
          <Stack.Screen name={"Register"} component={RegisterScreen} options={noHeader} />
          <Stack.Screen name={"QrReader"} component={QrReaderScreen} options={{ title: "Lector QR" }} />
          <Stack.Screen name={"PassWord"} component={PassWordScreen} options={{ title: "Registrar Contraseña" }} />
          <Stack.Screen name={"Main"} component={DrawerMenu} options={noHeader} />
        </Stack.Navigator>
      </NavigationContainer >
    </PaperProvider>
  );
};

export default App;
