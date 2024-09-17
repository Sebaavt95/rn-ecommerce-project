import { useState } from 'react';
import { Pressable, ToastAndroid, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Button from '../../components/Button/Button';
import colors from '../../global/colors';
import styles from '../Login/styles';
import { useSignUpMutation } from '../../services/auth';
import { signupSchema } from '../../validations/signupSchema';

const Signup = ({ navigation }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [triggerSignup, { isLoading, isError, error }] = useSignUpMutation();

  const handleChange = (label, value) => {
    setFormError({ ...formError, [label]: '' });
    setUserData({
      ...userData,
      [label]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      signupSchema.validateSync({
        email: userData?.email,
        password: userData?.password,
        confirmPassword: userData?.confirmPassword,
      });
      const { data } = await triggerSignup({
        email: userData?.email,
        password: userData?.password,
      });
      if (!data) return;
      ToastAndroid.show('Cuenta creada exitosamente!', ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate({
          name: 'login',
          params: { unregisteredEmail: data?.email },
        });
      }, 1000);
    } catch ({ path, message }) {
      setFormError({ ...formError, [path]: message });
    }
  };

  return (
    <View style={styles.main}>
      {isError && (
        <View>
          <Text color={colors.error}>{error?.data?.error?.message}</Text>
        </View>
      )}
      <View style={styles.container}>
        <Text fontSize={22}>Sign up</Text>
        <Input
          label="Email"
          onChange={value => handleChange('email', value)}
          error={formError?.email}
        />
        <Input
          label="Password"
          onChange={value => handleChange('password', value)}
          isSecure
          error={formError?.password}
        />
        <Input
          label="Confirm password"
          onChange={value => handleChange('confirmPassword', value)}
          isSecure
          error={formError?.confirmPassword}
        />
        <Button width={100} handlePress={handleSubmit}>
          {!isLoading ? (
            <Text textAlign="center">Sign up</Text>
          ) : (
            <Loader size={28} color="white" />
          )}
        </Button>
        <Text fontSize={14} color={colors.info}>
          Already have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate('login')}>
          <Text
            fontSize={14}
            color={colors.tertiary}
            customStyles={styles.link}
          >
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default Signup;
