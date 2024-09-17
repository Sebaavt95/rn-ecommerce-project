import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadMoviesByGenre, selectMovie } from '../../features/shopSlice';
import MovieCard from '../../components/MovieCard/MovieCard';
import NotFound from '../../components/NotFound';
import colors from '../../global/colors';

const MoviesList = ({ navigation }) => {
  const { selectedGenre, movies, moviesByGenre } = useSelector(
    state => state.shop
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movies.length) return;
    const moviesByGenre = movies.filter(movie =>
      movie.genre_ids.includes(selectedGenre.id)
    );
    dispatch(loadMoviesByGenre(moviesByGenre));
  }, [selectedGenre]);

  const handleSelectMovie = movie => {
    dispatch(selectMovie(movie));
    navigation.navigate('movieDetails');
  };

  return (
    <View style={styles.container}>
      {moviesByGenre.length ? (
        <FlatList
          data={moviesByGenre}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              handleSelectMovie={() => handleSelectMovie(item)}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      ) : (
        <NotFound
          iconName="emoji-sad"
          message="No hay películas para el género seleccionado"
        />
      )}
    </View>
  );
};

MoviesList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
