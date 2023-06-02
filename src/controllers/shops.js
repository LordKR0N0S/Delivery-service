import Shop from '../models/Shop.js';

export const getShops = async (_, res) => {
  try {
    const shops = await Shop.find({});
    res.status(200).json(shops);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
