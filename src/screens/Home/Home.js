import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  loadGenres,
  loadMovies,
  selectGenre,
  selectMovie,
} from '../../features/shopSlice';
import {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetProfileDataQuery,
} from '../../services/shop';
import Searchbar from '../../components/Searchbar';
import colors from '../../global/colors';
import Text from '../../components/Text';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './styles';

const Home = ({ navigation }) => {
  const { id } = useSelector(state => state.auth.user);
  const { data: profileData } = useGetProfileDataQuery(id);
  const { data: genres, isLoading, error } = useGetGenresQuery();
  const { data: movies, isSuccess } = useGetMoviesQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) return;
    dispatch(loadGenres(genres));
  }, [genres]);

  useEffect(() => {
    if (isSuccess) dispatch(loadMovies(movies));
  }, [movies]);

  const favouriteLocation = profileData?.favouriteLocation;

  const selectHighlightedMovie = movie => {
    const movieGenre = genres.find(genre => genre.id === movie?.genre_ids[0]);
    dispatch(selectGenre(movieGenre));
    dispatch(selectMovie(movie));
    navigation.navigate('movieDetails');
  };

  const handleSelectGenre = () => navigation.navigate('moviesList');

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <Loader size={80} color="tertiary" />
        </View>
      ) : (
        <>
          {favouriteLocation?.address && (
            <View style={styles.addressTopWrapper}>
              <Text type="bold" fontSize={18} customStyles={styles.sendTitle}>
                Envío a
              </Text>
              <Text fontSize={20}>
                {favouriteLocation?.address.substring(0, 25) + '...'}
              </Text>
              <Button
                style={styles.changeAddressBtn}
                handlePress={() => navigation.navigate('profileTab')}
              >
                <AntDesign name="edit" size={24} color={colors.white} />
              </Button>
            </View>
          )}
          <View style={styles.homeTitle}>
            <MaterialCommunityIcons
              name="movie-open-outline"
              size={60}
              color={colors.white}
            />
            <Text fontSize={35}>MovieBuster</Text>
          </View>
          <View style={styles.searchbarWrapper}>
            <Text textAlign="center" fontSize={25}>
              Buscar por género
            </Text>
            <Searchbar handleSelect={handleSelectGenre} />
          </View>
          {movies && movies.length && (
            <View style={styles.movies}>
              <Text
                textAlign="center"
                fontSize={25}
                customStyles={styles.highlightedTitle}
              >
                Destacadas
              </Text>
              <FlatList
                data={movies.filter(movie => movie.highlighted)}
                renderItem={({ item }) => (
                  <MovieCard
                    movie={item}
                    handleSelectMovie={() => selectHighlightedMovie(item)}
                  />
                )}
                keyExtractor={item => item.id}
                horizontal
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default Home;
