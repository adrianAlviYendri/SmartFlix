import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch favorites (sudah ada)
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const response = await axios.get("http://localhost:3000/favorites", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  }
);

// Tambahkan movie ke favorites
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (MovieId) => {
    const response = await axios.post(
      `http://localhost:3000/favorites/${MovieId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async (MovieId) => {
    await axios.delete(`http://localhost:3000/favorites/${MovieId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return MovieId; // Return MovieId supaya bisa dihapus dari state
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item.MovieId !== action.payload
        );
      });
  },
});

export default favoriteSlice.reducer;
