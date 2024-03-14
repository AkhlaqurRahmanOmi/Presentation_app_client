import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './authRoute';
import AdminRouts from './adminRoute';
import UserRoute from './userRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyContext} from '../../App';

const Router = () => {
  const {initialValue, setInitialValue} = useContext(MyContext);

  const fetchLocalStorage = async () => {
    const data = await AsyncStorage.getItem('user');
    const parsedData = JSON.parse(data);
    setInitialValue(parsedData);
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  const screenToRender = () => {
    if (!initialValue) {
      return <AuthRoutes />;
    } else {
      if (initialValue?.userWithoutPassword?.role === 'admin') {
        return <AdminRouts />;
      } else {
        return <UserRoute />;
      }
    }
  };

  return <NavigationContainer>{screenToRender()}</NavigationContainer>;
};

export default Router;
