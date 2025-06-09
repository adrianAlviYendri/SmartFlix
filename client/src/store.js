import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie/features/MovieSlice";
import favoriteReducer from "./movie/features/favoriteSlice";
import publicReducer from "./movie/features/publicSlice";
import recommendationReducer from "./movie/features/recommendationSlice";
import profileReducer from "./movie/features/profileSlice";
import cartReducer from "./movie/features/MyCartSlice";

const cartFromLocalStorage = localStorage.getItem("cartState");
const initialCartState = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : { list: [], selectedItems: [] };

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

store.subscribe(() => {
  const cartState = store.getState().cart;
  const userId = localStorage.getItem("userId");
  if (userId) {
    localStorage.setItem(
      "cartState",
      JSON.stringify({
        list: cartState.list || [],
        selectedItems: cartState.selectedItems || [],
      })
    );
  }
});

export default store;
