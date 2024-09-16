import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      id: null,
      token: null,
      isLogged: false,
      locations: [],
    },
  },
  reducers: {
    loadUserData: (state, action) => {
      const { email, id, token } = action.payload || {};
      state.user = {
        ...state.user,
        email,
        id,
        token,
        isLogged: true,
      };
    },
    saveUserLocations: (state, action) => {
      state.user.locations = action.payload;
    },
    clearUserData: state => {
      state.user = {
        email: null,
        id: null,
        token: null,
        isLogged: false,
        locations: [],
      };
    },
  },
});

export const { loadUserData, saveUserLocations, clearUserData } =
  authSlice.actions;

export default authSlice.reducer;
