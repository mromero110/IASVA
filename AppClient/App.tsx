import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/loginScreen';
import RegisterScreen from './src/screens/registration/registerScreen';
import { Routes } from './src/config/routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppTheme, ColorTheme } from './src/theme/appTheme';
import QrReaderScreen from './src/screens/security/qrReaderScreen';
import PassWordScreen from './src/screens/security/passwordScreen';

const Stack = createNativeStackNavigator<Routes>();
const noHeader = { headerShown: false };
const options = {
  headerTintColor: ColorTheme.white,
  headerStyle: { backgroundColor: ColorTheme.primary },
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
          <Stack.Screen name={"QrReader"} component={QrReaderScreen} options={{ title: "Lector QR" }} />
          <Stack.Screen name={"PassWord"} component={PassWordScreen} options={{ title: "Lector QR" }} />
        </Stack.Navigator>
      </NavigationContainer >
    </PaperProvider>
  );
};

export default App;
