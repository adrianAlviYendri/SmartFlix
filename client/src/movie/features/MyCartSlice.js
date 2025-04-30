// movie/features/MyCartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const myCartSlice = createSlice({
  name: "cart",
  initialState: {
    list: [],
  },
  reducers: {
    createCart(state, { payload }) {
      const found = state.list.find((item) => item.id === payload.id);
      if (!found) {
        state.list.push({ ...payload, quantity: 1 });
      } else {
        found.quantity++;
      }
    },
    incrementQuantity(state, { payload }) {
      const item = state.list.find((i) => i.id === payload);
      if (item) item.quantity++;
    },
    decrementQuantity(state, { payload }) {
      const item = state.list.find((i) => i.id === payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export default myCartSlice.reducer;

export const { createCart, incrementQuantity, decrementQuantity } =
  myCartSlice.actions;
