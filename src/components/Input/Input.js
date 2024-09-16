import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import colors from '../../global/colors';

const Input = ({
  label,
  inputValue = '',
  onChange,
  isSecure = false,
  error = '',
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const handleChange = value => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <View style={styles.inputContainer}>
      <Text fontSize={16} customStyles={{ width: '90%' }}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        secureTextEntry={isSecure}
      />
      {error && (
        <Text
          fontSize={16}
          color={colors.error}
          customStyles={{
            alignSelf: 'flex-start',
            paddingHorizontal: 20,
            marginTop: 5,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  isSecure: PropTypes.bool,
  error: PropTypes.string,
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '90%',
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: colors.white,
    padding: 2,
    fontFamily: 'JosefinRegular',
    fontSize: 14,
    color: colors.white,
  },
});
