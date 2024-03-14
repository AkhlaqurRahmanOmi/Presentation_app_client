import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from './screenNames';
import SignUpScreen from '../screens/signUp';
import LoginScreen from '../screens/signIn';
import HomeScreen from '../screens/Home';
import AdminHome from '../screens/AdminHome/AdminHome';
import UpdateQuestion from '../screens/AdminHome/UpdateQuestion';

const Stack = createNativeStackNavigator();

const AdminRouts = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screenNames.AdminHome}>
      <Stack.Screen name={screenNames.AdminHome} component={AdminHome} />
      <Stack.Screen
        name={screenNames.UpdateQuestion}
        component={UpdateQuestion}
      />
    </Stack.Navigator>
  );
};

export default AdminRouts;
