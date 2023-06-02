import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import shopsRoutes from './routes/shopsRoutes.js';
import ordersRoute from './routes/ordersRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/v1/shops', shopsRoutes);
app.use('/api/v1/order', ordersRoute);

app.get('/', async (_, res) => {
  res.send('Best delivery server is working');
});

const connectDB = (url) => {
  mongoose.set('strictQuery', true);

  mongoose
    .connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
};

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(4001, () => console.log('Server is running on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
