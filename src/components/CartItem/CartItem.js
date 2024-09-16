import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from '../Text';
import { getImageUrl } from '../../utils';
import { removeFromCart } from '../../features/cartSlice';
import colors from '../../global/colors';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  if (!item) return;

  const { name, genre, quantity, price, image } = item || {};

  const handleRemove = () => dispatch(removeFromCart(item));

  return (
    <View style={styles.card}>
      <Image
        style={{ width: '25%', height: '100%' }}
        source={{
          uri: getImageUrl(image, '185'),
        }}
      />
      <View style={styles.info}>
        <Text
          fontSize={15}
          customStyles={{ textTransform: 'uppercase' }}
          color={colors.primary}
          fontWeight="bold"
        >
          {genre}
        </Text>
        <Text>{name}</Text>
        <Text fontSize={15}>
          Cantidad: {quantity} • ${price}
        </Text>
      </View>
      <View style={styles.icon}>
        <Pressable onPress={handleRemove}>
          <Ionicons name="trash-sharp" size={28} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    genre: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 150,
    padding: 10,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 2,
    backgroundColor: colors.tertiary,
  },
  info: {
    width: '70%',
    marginLeft: 10,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});
