import React, {useState, useEffect, useContext, useCallback} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {MyContext} from '../../../App';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import io from 'socket.io-client';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {screenNames} from '../../routes/screenNames';

const socket = io('http://192.168.0.122:8080');

const AdminHome = () => {
  const {initialValue, setInitialValue} = useContext(MyContext);
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setInitialValue(null);
  };

  const getallquestion = async () => {
    const response = await axios.get(
      'http://192.168.0.122:8080/api/v1/questions',
    );
    setQuestions(response.data);
  };

  useEffect(() => {
    getallquestion();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getallquestion();
    }, []),
  );

  const handleGiveAccess = async id => {
    try {
      const response = await axios.put(
        `http://192.168.0.122:8080/api/v1/grant-access/${id}`,
      );
      socket.emit('submitQuestion', id);
      getallquestion();
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
      <ScrollView>
        {questions?.map(item => (
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
                  {item?.title}
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                {item?.options?.map((op, index) => (
                  <Text
                    style={{fontSize: 14, fontWeight: '600', color: '#000'}}>
                    {index + 1}.{op}
                  </Text>
                ))}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                columnGap: 10,
              }}>
              <Button
                onPress={() => handleGiveAccess(item?._id)}
                title="Give Access"
                disabled={item?.accessible}
              />
              <Button
                onPress={() =>
                  navigation.navigate(screenNames.UpdateQuestion, {
                    item: item,
                  })
                }
                title="update"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default AdminHome;
