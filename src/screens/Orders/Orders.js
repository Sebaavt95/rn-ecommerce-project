import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-native-basic-carousel';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
import NotFound from '../../components/NotFound';
import colors from '../../global/colors';
import { useGetOrdersByUserQuery } from '../../services/shop';

const Orders = () => {
  const { id } = useSelector(state => state.auth.user);
  const { data: orders = [], isLoading, error } = useGetOrdersByUserQuery(id);

  const { width } = useWindowDimensions();

  if (error) return null;

  return (
    <View style={styles.container}>
      <Header title="Órdenes" />
      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <Loader size={80} color="tertiary" />
        </View>
      ) : (
        <>
          {orders.length ? (
            <Carousel
              data={orders}
              renderItem={({ item }) => <OrderItem order={item} />}
              itemWidth={width}
            />
          ) : (
            <NotFound iconName="text-document" message="No hay órdenes" />
          )}
        </>
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loaderWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
