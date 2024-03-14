import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from './screenNames';
import SignUpScreen from '../screens/signUp';
import LoginScreen from '../screens/signIn';
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoginScreen">
      <Stack.Screen
        name={screenNames.SignUpScreen}
        component={SignUpScreen}
        in
      />
      <Stack.Screen name={screenNames.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
