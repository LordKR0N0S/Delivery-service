import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  shops: [],
  currentOrder: {
    orders: [],
  },
  currentShop: {},
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setShops: (state, action) => {
      state.shops = action.payload.shops;
    },
    setCurrentShop: (state, action) => {
      state.currentShop = action.payload.shop;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder.totalPrice = state.currentOrder.totalPrice || 0;

      if (
        !state.currentOrder.orders
          .map((order) => order.productId)
          .includes(action.payload.productId)
      ) {
        const newObject = { ...action.payload, quantity: 1 };
        state.currentOrder.orders = [...state.currentOrder.orders, newObject];

        state.currentOrder.totalPrice += action.payload.price;
        state.currentOrder.totalPrice = Number(
          state.currentOrder.totalPrice.toFixed(2)
        );
      } else {
        state.currentOrder.orders = state.currentOrder.orders.map((order) => {
          if (order.productId === action.payload.productId) {
            return {
              ...order,
              quantity: order.quantity + 1,
            };
          }
          return order;
        });

        state.currentOrder.totalPrice += action.payload.price;
        state.currentOrder.totalPrice = Number(
          state.currentOrder.totalPrice.toFixed(2)
        );
      }

      state.currentOrder.totalAmount = state.currentOrder.orders.reduce(
        (total, order) => total + order.quantity,
        0
      );

      state.currentOrder.shopName = state.currentShop.shopName;
    },
    addOrder: (state, action) => {
      const actualOrder = state.currentOrder.orders.find(
        (obj) => obj.productId === action.payload
      );
      actualOrder.quantity++;
      state.currentOrder.totalAmount++;
      state.currentOrder.totalPrice += actualOrder.price;
    },
    removeOrder: (state, action) => {
      const actualOrder = state.currentOrder.orders.find(
        (obj) => obj.productId === action.payload
      );

      if (actualOrder.quantity === 0) return;

      actualOrder.quantity--;
      state.currentOrder.totalAmount--;
      state.currentOrder.totalPrice =
        state.currentOrder.totalPrice - actualOrder.price;

      if (state.currentOrder.totalAmount === 0) {
        state.currentOrder = {
          orders: [],
        };
      }
    },
    resetCurrentShop: (state) => {
      state.currentShop = {};
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = {
        orders: [],
      };
    },
  },
});

export const {
  setMode,
  setShops,
  setCurrentShop,
  setCurrentOrder,
  addOrder,
  removeOrder,
  resetCurrentShop,
  resetCurrentOrder,
} = shopSlice.actions;

export default shopSlice.reducer;
