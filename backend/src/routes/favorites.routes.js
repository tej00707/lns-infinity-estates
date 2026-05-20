import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  addFavorite,
  removeFavorite,
  getFavorites
} from '../controllers/favorites.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getFavorites);
router.post('/:propertyId', addFavorite);
router.delete('/:propertyId', removeFavorite);

export default router;
