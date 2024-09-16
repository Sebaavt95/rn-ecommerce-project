import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Text from '../../components/Text';
import CartItem from '../../components/CartItem';
import NotFound from '../../components/NotFound';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { clearCart } from '../../features/cartSlice';
import { usePostOrderMutation } from '../../services/shop';
import { getDate } from '../../utils';
import styles from './styles';

const Cart = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useSelector(state => state.auth.user);
  const order = useSelector(state => state.cart.order);

  const [saveToOrders] = usePostOrderMutation();

  const confirmPurchase = () => {
    try {
      saveToOrders({
        id,
        order: {
          ...order,
          createdAt: getDate(),
        },
      });
      dispatch(clearCart());
      setIsModalOpen(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const { items = [], total } = order || {};

  return (
    <View style={styles.container}>
      <Header title="Carrito" />
      {items.length ? (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartItem key={item.id} item={item} />}
            keyExtractor={item => item.id}
            style={styles.list}
          />
          <View style={styles.summary}>
            <Text fontSize={28}>Total: ${total}</Text>
            <Button handlePress={() => setIsModalOpen(true)}>
              <Text>Confirmar compra</Text>
            </Button>
          </View>
          <Modal
            animationType="slide"
            transparent
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            handleConfirm={confirmPurchase}
            handleCancel={() => setIsModalOpen(false)}
          >
            <Text>¿Seguro desea confirmar?</Text>
          </Modal>
        </>
      ) : (
        <NotFound iconName="inbox" message="Carrito vacío" />
      )}
    </View>
  );
};

export default Cart;
