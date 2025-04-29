import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecommendations = createAsyncThunk(
  "recommendation/fetchRecommendations",
  async (preferences) => {
    const response = await axios.post(
      "http://localhost:3000/recommend",
      { preferences },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return response.data;
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recommendationSlice.reducer;
