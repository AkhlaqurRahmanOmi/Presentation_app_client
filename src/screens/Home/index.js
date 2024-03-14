import React, {useState, useEffect, useContext} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {MyContext} from '../../../App';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://192.168.0.122:8080');

const HomeScreen = () => {
  const {initialValue, setInitialValue} = useContext(MyContext);
  const [question, setQuestion] = useState({});

  const getQuestion = async id => {
    const response = await axios.get(
      `http://192.168.0.122:8080/api/v1/questions/${id}`,
    );
    console.log(response.data);
    setQuestion(response?.data);
  };

  useEffect(() => {
    // Event listener for receiving new questions
    socket.on('newQuestion', question => {
      getQuestion(question);
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off('newQuestion');
    };
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setInitialValue(null);
  };

  const handleSubmit = async answer => {
    console.log('===============================================');
    try {
      const response = await axios.post(
        'http://192.168.0.122:8080/api/v1/submit-answer',
        {
          // userId: initialValue?.userWithoutPassword?._id,
          // questionId: question?._id,
          // answer: answer,
          userId: '65e4cc67d94249aa3e82d446',
          questionId: '65e5eb1150f8e6501757ade2',
          answer: 'hi',
        },
      );
      Alert.alert('Successfully submit Answer');
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
          {initialValue?.userWithoutPassword?.name}
        </Text>
        <Button onPress={handleLogout} title="Logout" />
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={{marginTop: 10, marginBottom: 10}}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#000',
                width: '80%',
              }}>
              {question?.title}
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            {question?.options?.map((op, index) => (
              <Text
                onPress={() => handleSubmit(op)}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000',
                  marginTop: 5,
                }}>
                {index + 1}.{op}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
