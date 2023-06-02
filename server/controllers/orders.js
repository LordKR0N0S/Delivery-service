import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const newOrder = new Order(order);

    await newOrder.save();

    const orderResponse = await Order.findOne({ _id: newOrder._id });

    res.status(201).json(orderResponse);
  } catch (err) {
    res.stats(409).json({ message: err.message });
  }
};

export const getOrders = async (_, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.stats(409).json({ message: err.message });
  }
};
