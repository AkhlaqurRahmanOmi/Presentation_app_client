import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({
  title = 'Button',
  containerStyle = {},
  titleStyle = {},
  onPress = () => {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.btnContainer,
        containerStyle,
        {backgroundColor: disabled ? '#4785' : '#13B68F'},
      ]}>
      <Text style={[styles.btnTitle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  btnTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});
