import React, {forwardRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import {icons} from '../../constants/icons';

const SimpleInput = forwardRef(
  (
    {
      onFocus = () => {},
      onChangeText = () => {},
      renderLeft = () => {},
      value = '',
      keyBoardType = 'default',
      label = '',
      placeholder,
      containerStyle = {},
      autoFocus = false,
      editable = true,
      error = '',
      maxLength,
      inputStyles,
      autoCapitalize = 'none',
      passwordField = false,
    },
    ref,
  ) => {
    const handleChangeText = val => {
      onChangeText(val);
    };
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordshow, setIsPasswordShow] = useState(passwordField);

    const editableStyles = editable ? {} : styles.disabled;
    const focusedStyles = isFocused ? styles.focused : {};

    const handleOnFocus = e => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleOnBlur = () => {
      setIsFocused(false);
    };

    return (
      <View style={containerStyle}>
        {label && <Text style={styles.labelStyle}>{label}</Text>}
        <View style={[styles.main_container, editableStyles, focusedStyles]}>
          {renderLeft()}
          <TextInput
            ref={ref}
            placeholderTextColor="#b2bec3"
            keyboardType={keyBoardType}
            style={[styles.input_container, inputStyles]}
            onChangeText={val => handleChangeText(val)}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            editable={editable}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            secureTextEntry={isPasswordshow}
          />
          {passwordField && (
            <TouchableOpacity
              style={styles.eye_container}
              onPress={() => setIsPasswordShow(prev => !prev)}>
              {/* {isPasswordshow ? icons.eye() : icons.eyeOff()} */}
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

SimpleInput.displayName = 'SimpleInput';
export default SimpleInput;

const styles = StyleSheet.create({
  main_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
  },
  input_container: {
    paddingHorizontal: 10,
    width: Dimensions.get('window').width - 100,
    height: 45,
    fontSize: 14,
    color: '#000',
  },
  eye_container: {
    height: '100%',
    width: 50,
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    color: '#000',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 20,
    fontFamily: 'Poppins',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  disabled: {
    backgroundColor: 'lightgrey',
  },
  focused: {
    borderColor: '#C7C7C7',
  },
});
