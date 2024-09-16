import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Profile from '../screens/Profile';
import AddressList from '../screens/Profile/screens/AddressList';
import Location from '../screens/Profile/screens/Location';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{
        header: () => <Header title="Perfil" />,
      }}
    >
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="addressList" component={AddressList} />
      <Stack.Screen name="location" component={Location} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
