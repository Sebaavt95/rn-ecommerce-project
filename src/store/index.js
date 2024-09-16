import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import appReducer from '../features/shopSlice';
import cartReducer from '../features/cartSlice';
import authReducer from '../features/authSlice';
import { shopApi } from '../services/shop';
import { authApi } from '../services/auth';

const store = configureStore({
  reducer: {
    shop: appReducer,
    cart: cartReducer,
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
