import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import colors from '../../global/colors';
import styles from './styles';

const OrderItem = ({ order }) => {
  const { createdAt, items, total } = order || {};

  return (
    <View style={styles.card}>
      <Text
        customStyles={{ marginBottom: 30 }}
        color={colors.info}
        fontSize={25}
      >
        Fecha: {createdAt}
      </Text>

      <View style={styles.textWrapper}>
        <Text customStyles={{ marginBottom: 10 }}>Películas</Text>
      </View>
      {items.length && (
        <FlatList
          data={items}
          renderItem={item => {
            return (
              <View style={styles.itemWrapper}>
                <Text>{item?.item?.name}</Text>
                <Text>
                  Cantidad: {item?.item?.quantity} • Total: $
                  {item?.item?.quantity * item?.item?.price}
                </Text>
              </View>
            );
          }}
          keyExtractor={key => key.id}
          style={styles.list}
        />
      )}

      <Text
        fontSize={25}
        customStyles={{
          backgroundColor: colors.light,
          padding: 10,
        }}
      >
        Total: ${total}
      </Text>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    items: PropTypes.array,
    total: PropTypes.number,
  }),
};

export default OrderItem;
