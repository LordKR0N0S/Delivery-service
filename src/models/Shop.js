import mongoose from 'mongoose';

const ShopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    adress: {
      type: String,
      required: true,
    },
    coords: {
      type: Object,
      required: true,
    },
    shopPicturePath: {
      type: String,
      required: true,
    },
    goods: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model('Shop', ShopSchema)

export default Shop;