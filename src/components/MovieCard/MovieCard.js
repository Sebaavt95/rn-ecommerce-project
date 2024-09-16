import { Image, Pressable, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { selectMovie } from '../../features/shopSlice';
import { getImageUrl } from '../../utils';

const MovieCard = ({ movie, handleSelectMovie }) => {
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(selectMovie(movie));
    handleSelectMovie();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleOnPress}>
        <Image
          style={styles.image}
          source={{
            uri: getImageUrl(movie.poster_path, '342'),
          }}
        />
      </Pressable>
    </View>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    genre_ids: PropTypes.array,
    highlighted: PropTypes.bool,
    id: PropTypes.string,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    price: PropTypes.number,
    relase_date: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }),
  handleSelectMovie: PropTypes.func,
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  image: {
    width: 120,
    height: 200,
  },
});
