import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        header: () => <Header title="Bienvenido" />,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
