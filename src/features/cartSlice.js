import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    order: {
      name: 'userLogged',
      items: [],
      createdAt: '',
      total: 0,
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const movie = action.payload;
      const movieAlreadyExistsInCart = state.order.items.some(
        item => item.id === movie.id
      );
      state.order.items = !movieAlreadyExistsInCart
        ? [...state.order.items, movie]
        : state.order.items.map(item =>
            item.id === movie.id
              ? { ...item, quantity: item.quantity + movie.quantity }
              : item
          );

      state.order.total = state.order.items.reduce(
        (accum, current) => (accum += current.quantity * current.price),
        0
      );
    },
    removeFromCart: (state, action) => {
      const movie = action.payload;
      if (!movie?.id) return;
      state.order.items = state.order.items.filter(
        item => item.id !== movie?.id
      );
      state.order.total = state.order.total - movie?.price * movie?.quantity;
    },
    clearCart: state => {
      state.order.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
