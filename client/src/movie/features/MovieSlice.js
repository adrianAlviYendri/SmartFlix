import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: {
    data: [],
    loading: false,
    error: null,
  },
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("http://localhost:3000/movies", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.list.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
