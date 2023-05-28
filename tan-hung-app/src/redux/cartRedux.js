import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.products.find(
        (product) => product._id === productToAdd._id
      );

      if (existingProduct) {
        // Tăng số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
        state.total += productToAdd.price * productToAdd.quantity;
        state.quantity += productToAdd.quantity;
        existingProduct.quantity += productToAdd.quantity;
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        state.total += productToAdd.price * productToAdd.quantity;
        state.quantity += productToAdd.quantity;
        state.products.push(productToAdd);
      }
    },
    removeProduct: (state, action) => {
      const removedProduct = action.payload; // Sản phẩm cần xóa
      const index = state.products.findIndex(
        (product) => product._id === removedProduct._id
      );

      if (index !== -1) {
        const removedProductQuantity = state.products[index].quantity;
        state.quantity -= removedProductQuantity;
        state.total -= removedProduct.price * removedProductQuantity;
        state.products.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
