import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie/features/MovieSlice";
import favoriteReducer from "./movie/features/favoriteSlice";
import publicReducer from "./movie/features/publicSlice";
import recommendationReducer from "./movie/features/recommendationSlice";
import profileReducer from "./movie/features/profileSlice";
import cartReducer from "./movie/features/MyCartSlice";

// Ambil data cart dari localStorage
const cartFromLocalStorage = localStorage.getItem("cartState");
const initialCartState = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : { list: [] };

const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoriteReducer,
    public: publicReducer,
    recommendation: recommendationReducer,
    profile: profileReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: initialCartState,
  },
});

// Simpan ke localStorage setiap kali cart berubah
store.subscribe(() => {
  const cartState = store.getState().cart;
  localStorage.setItem("cartState", JSON.stringify(cartState));
});

export default store;
