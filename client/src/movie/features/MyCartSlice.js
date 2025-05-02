import { createSlice } from "@reduxjs/toolkit";

const myCartSlice = createSlice({
  name: "cart",
  initialState: {
    list: [],
    selectedItems: [], // Menyimpan ID film yang dipilih untuk checkout
  },
  reducers: {
    createCart(state, { payload }) {
      const { id, userId } = payload;
      const found = state.list.find(
        (item) => item.id === id && item.userId === userId
      );

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
    removeFromCart(state, { payload }) {
      state.list = state.list.filter((item) => item.id !== payload);
      state.selectedItems = state.selectedItems.filter((id) => id !== payload);
    },
    toggleSelectItem(state, { payload }) {
      const { id, userId } = payload;

      const index = state.selectedItems.findIndex(
        (item) => item.id === id && item.userId === userId
      );

      if (index === -1) {
        state.selectedItems.push({ id, userId });
      } else {
        state.selectedItems.splice(index, 1);
      }
    },

    clearSelectedItems(state) {
      state.selectedItems = [];
    },
  },
});

export default myCartSlice.reducer;

export const {
  createCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  toggleSelectItem,
  clearSelectedItems,
} = myCartSlice.actions;

export const selectCheckoutTotal = (userId) => (state) => {
  return state.cart.list
    .filter((item) =>
      state.cart.selectedItems.some(
        (selected) => selected.id === item.id && selected.userId === userId
      )
    )
    .reduce(
      (total, item) =>
        Number(total) + Number(item.price) * Number(item.quantity),
      0
    );
};
