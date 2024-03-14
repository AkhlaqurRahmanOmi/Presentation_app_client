import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {screenNames} from '../../routes/screenNames';
import {MyContext} from '../../../App';

const SignupScreen = () => {
  const {initialValue, setInitialValue} = useContext(MyContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // const handleSignup = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/v1/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: {userName, email, password},
  //     });
  //     const data = await response.json();
  //     console.log('data===>>', data);
  //     if (data.success) {
  //       // Store token securely
  //       await AsyncStorage.setItem('token', data.token);
  //       // Navigate to the next screen or perform other actions
  //       // navigation.navigate('LoginScreen');
  //       Alert.alert('Success', 'Signup successful!');
  //     } else {
  //       Alert.alert('Error', data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     Alert.alert('Error', 'An error occurred. Please try again later.');
  //   }
  // };

  // 2nd
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.122:8080/api/v1/signup',
        {
          name,
          email,
          password,
        },
      );

      const data = response.data;

      if (data) {
        // Store token securely
        await AsyncStorage.setItem('user', JSON.stringify(data));
        setInitialValue(data);
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
        placeholder="Username"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <Button title="Signup" onPress={handleSignup} />

      <View style={styles.alreadyAccount}>
        <Text style={styles.alreadyAccountText}> have an account?</Text>
        <Text
          onPress={() => navigation.navigate(screenNames.LoginScreen)}
          style={[
            styles.alreadyAccountText,
            {color: '#FF0000', fontWeight: '700'},
          ]}>
          Log in
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
    marginTop: 50,
  },
  alreadyAccountText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});

export default SignupScreen;
