import { useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import StarRating from 'react-native-star-rating-widget';
import { Rating } from '@kolking/react-native-rating';
import AntDesign from '@expo/vector-icons/AntDesign';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { addToCart } from '../../features/cartSlice';
import { getImageUrl } from '../../utils';
import styles from './styles';
import colors from '../../global/colors';

const MovieDetails = () => {
  const { selectedMovie, selectedGenre } = useSelector(state => state.shop);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { width, height } = useWindowDimensions();

  const currentMovie = selectedMovie;

  const handleChangeQty = type => {
    const newQty = quantity + (type === 'plus' ? 1 : -1);
    setQuantity(newQty);
  };

  const handlePurchase = () => {
    const moviePurchaseData = {
      id: selectedMovie.id,
      name: selectedMovie.original_title,
      genre: selectedGenre.name,
      quantity,
      price: selectedMovie.price,
      image: selectedMovie.poster_path,
    };
    dispatch(addToCart(moviePurchaseData));
    ToastAndroid.show('Producto agregado!', ToastAndroid.SHORT);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={{ width, height: height * 0.7 }}
        source={{
          uri: getImageUrl(currentMovie.poster_path, '500'),
        }}
      />
      <View style={styles.detailsContainer}>
        <Text customStyles={styles.detailsText}>
          • {currentMovie.release_date.split('-')[0] || 'N/A'} •{' '}
          {selectedGenre?.name || 'N/A'} •{' '}
          <AntDesign name="like1" size={20} color={colors.white} />{' '}
          {currentMovie.vote_count}
        </Text>
        {/* <StarRating
          rating={currentMovie.vote_average}
          maxStars={10}
          starSize={24}
          color={colors.white}
          onChange={() => {}}
        /> */}
        <Rating
          variant="stars-outline"
          baseColor={colors.white}
          fillColor={colors.warning}
          rating={currentMovie.vote_average}
          maxRating={10}
          disabled
          onChange={() => {}}
        />
      </View>
      {currentMovie.overview && (
        <View style={styles.sinopsis}>
          <Text fontSize={25} fontWeight="bold">
            Sinopsis
          </Text>
          <View style={styles.separator}></View>
          <Text fontSize={18}>{currentMovie.overview}</Text>
        </View>
      )}
      <View style={styles.price}>
        <Text fontSize={25}>Precio: ${currentMovie.price}</Text>
      </View>
      <View style={styles.purchaseActions}>
        <View style={styles.buttonContainer}>
          <View style={styles.qtySelector}>
            <Button
              width={50}
              handlePress={() => handleChangeQty('minus')}
              disabled={quantity === 1}
            >
              -
            </Button>
            <Text textAlign="center" customStyles={styles.quantity}>
              {quantity}
            </Text>
            <Button width={50} handlePress={() => handleChangeQty('plus')}>
              +
            </Button>
          </View>
          <Button handlePress={handlePurchase}>
            <Text>Comprar</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;
