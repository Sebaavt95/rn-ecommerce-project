import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Home from '../screens/Home/Home';
import MovieDetails from '../screens/MovieDetails';
import MoviesList from '../screens/MoviesList';

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  const { selectedGenre, selectedMovie } = useSelector(state => state.shop);

  const setHeaderTitle = routeName => {
    const pages = {
      home: 'Home',
      moviesList: selectedGenre?.name,
      movieDetails: selectedMovie?.original_title,
    };
    return pages[routeName] || routeName;
  };

  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        header: () => <Header title={setHeaderTitle(route.name)} />,
      })}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="moviesList" component={MoviesList} />
      <Stack.Screen name="movieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

export default ShopStack;
