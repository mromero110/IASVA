import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/loginScreen';
import RegisterScreen from './src/screens/registration/registerScreen';
import { Routes } from './src/config/routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppTheme } from './src/theme/appTheme';

const Stack = createNativeStackNavigator<Routes>();

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name={"Login"} component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name={"Register"} component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer >
    </PaperProvider>
  );
};

export default App;
