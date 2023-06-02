import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
