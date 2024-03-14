import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from './screenNames';
import SignUpScreen from '../screens/signUp';
import LoginScreen from '../screens/signIn';
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

const UserRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screenNames.HomeScreen}>
      <Stack.Screen name={screenNames.HomeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default UserRoute;
