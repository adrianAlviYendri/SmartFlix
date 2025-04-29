import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPublicMovies = createAsyncThunk(
  "public/fetchPublicMovies",
  async (searchQuery = "") => {
    const response = await axios.get(
      `http://localhost:3000/public?search=${searchQuery}`
    );
    return response.data;
  }
);

// Slice Redux
const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPublicMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default publicSlice.reducer;
