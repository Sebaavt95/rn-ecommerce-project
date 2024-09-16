import { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import colors from '../../global/colors';
import styles from './styles';
import { useLoginMutation } from '../../services/auth';
import { loginSchema } from '../../validations/loginSchema';
import { useDispatch } from 'react-redux';
import { loadUserData } from '../../features/authSlice';
import { insertSession } from '../../db';

const Login = ({ navigation, route }) => {
  const unregisteredEmail = route?.params?.unregisteredEmail;
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    email: '',
    password: '',
  });
  const [triggerLogin, { isLoading, isError, error }] = useLoginMutation();

  const dispatch = useDispatch();

  const handleChange = (label, value) => {
    setFormError({ ...formError, [label]: '' });
    setUserData({
      ...userData,
      [label]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      loginSchema.validateSync({
        email: userData?.email,
        password: userData?.password,
      });
      const { data } = await triggerLogin({
        email: userData?.email,
        password: userData?.password,
      });
      if (!data) return;
      const { email, localId: id, idToken: token } = data || {};
      insertSession({ email, id, token });
      dispatch(loadUserData({ email, id, token }));
    } catch ({ path, message }) {
      setFormError({ ...formError, [path]: message });
    }
  };

  useEffect(() => {
    setUserData({
      ...userData,
      email: unregisteredEmail,
    });
  }, [unregisteredEmail]);

  return (
    <View style={styles.main}>
      {isError && (
        <View>
          <Text color={colors.error}>{error?.data?.error?.message}</Text>
        </View>
      )}
      <View style={styles.container}>
        <Text fontSize={22}>Login to start</Text>
        <Input
          label="Email"
          inputValue={unregisteredEmail || ''}
          onChange={value => handleChange('email', value)}
          error={formError?.email}
        />
        <Input
          label="Password"
          isSecure
          onChange={value => handleChange('password', value)}
          error={formError?.password}
        />
        <Button width={100} handlePress={handleSubmit}>
          {!isLoading ? (
            <Text textAlign="center">Login</Text>
          ) : (
            <Loader size={28} color="white" />
          )}
        </Button>
        <Text fontSize={14} color={colors.info}>
          Not have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate('signup')}>
          <Text
            fontSize={14}
            color={colors.tertiary}
            customStyles={styles.link}
          >
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    route: PropTypes.shape({
      params: PropTypes.shape({
        unregisteredEmail: PropTypes.string,
      }),
    }),
  }),
};

export default Login;
