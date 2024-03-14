import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../routes/screenNames';

const UpdateQuestion = ({route}) => {
  const [data, setData] = useState(route?.params?.item || {});
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://192.168.0.122:8080/api/v1/update-question/${data?._id}`,
        {
          title: data?.title,
          options: data?.options,
        },
      );
      navigation.navigate(screenNames.AdminHome);
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View>
      <Text style={styles.header}>Update Question</Text>
      <View style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setData({...data, title: value})}
          value={data?.title}
        />
        <Text style={styles.label}>Option 1</Text>
        <TextInput
          style={styles.input}
          value={data?.options[0]}
          onChangeText={value => {
            const obj = {...data};
            obj.options[0] = value;
            setData(obj);
          }}
        />
        <Text style={styles.label}>Option 2</Text>
        <TextInput
          style={styles.input}
          value={data?.options[1]}
          onChangeText={value => {
            const obj = {...data};
            obj.options[1] = value;
            setData(obj);
          }}
        />
        <Text style={styles.label}>Option 3</Text>
        <TextInput
          style={styles.input}
          value={data?.options[2]}
          onChangeText={value => {
            const obj = {...data};
            obj.options[2] = value;
            setData(obj);
          }}
        />
        <Text style={styles.label}>Option 4</Text>
        <TextInput
          style={styles.input}
          value={data?.options[3]}
          onChangeText={value => {
            const obj = {...data};
            obj.options[3] = value;
            setData(obj);
          }}
        />
        <Button onPress={handleSubmit} title="update" />
      </View>
    </View>
  );
};

export default UpdateQuestion;

const styles = StyleSheet.create({
  header: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 5,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
  },
});
