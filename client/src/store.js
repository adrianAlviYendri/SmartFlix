import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie/features/MovieSlice";
import favoriteReducer from "./movie/features/favoriteSlice";
import publicReducer from "./movie/features/publicSlice";
import recommendationReducer from "./movie/features/recommendationSlice";
import profileReducer from "./movie/features/profileSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoriteReducer,
    public: publicReducer,
    recommendation: recommendationReducer,
    profile: profileReducer,
  },
});

export default store;
