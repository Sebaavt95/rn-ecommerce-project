import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'shop',
  initialState: {
    currentPage: 'home',
    genres: [],
    selectedGenre: null,
    movies: [],
    moviesByGenre: [],
    selectedMovie: null,
  },
  reducers: {
    loadGenres: (state, action) => {
      state.genres = action.payload;
    },
    selectGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    loadMovies: (state, action) => {
      state.movies = action.payload;
    },
    loadMoviesByGenre: (state, action) => {
      state.moviesByGenre = action.payload;
    },
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const {
  loadGenres,
  selectGenre,
  loadMovies,
  loadMoviesByGenre,
  selectMovie,
  changeModalState,
} = slice.actions;

export default slice.reducer;
