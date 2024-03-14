import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {screenNames} from '../../routes/screenNames';
import {MyContext} from '../../../App';

const LoginScreen = () => {
  const {initialValue, setInitialValue} = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.122:8080/api/v1/signin',
        {
          email,
          password,
        },
      );
      const data = response.data;
      console.log('Data....>', data);
      if (data) {
        // Store token securely
        await AsyncStorage.setItem('user', JSON.stringify(data));
        setInitialValue(data);
        Alert.alert('Success', 'Login successful!');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.alreadyAccount}>
        <Text style={styles.alreadyAccountText}>Don't have an account?</Text>
        <Text
          onPress={() => navigation.navigate(screenNames.SignUpScreen)}
          style={[
            styles.alreadyAccountText,
            {color: 'red', fontWeight: '700'},
          ]}>
          SignUp
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#000',
  },
  alreadyAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
    marginTop: 20,
  },
  alreadyAccountText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});

export default LoginScreen;
