import { Image, Pressable, useWindowDimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../utils';

const PADDING = 8;

const MovieCard = ({ movie, handleSelectMovie }) => {
  const { width } = useWindowDimensions();

  const imageWidth = ((100 / 3) * width) / 100 - PADDING * 2;

  return (
    <View style={{ padding: PADDING }}>
      <Pressable onPress={handleSelectMovie}>
        <Image
          style={{ width: imageWidth, height: 200 }}
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
