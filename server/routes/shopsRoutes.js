import express from 'express';
import { getShops } from '../controllers/shops.js';

const router = express.Router();

router.get('/', getShops);

export default router;