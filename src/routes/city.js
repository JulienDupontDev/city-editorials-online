import { Router } from 'express';
import {
  addCity,
  addCityDocument,
  deleteCities,
  deleteCity,
  getCities,
  getCity,
} from '../services/cityService.js';
import authenticated from '../ middlewares/auth.middleware.js';

const router = Router();

// get all cities
router.get('/', getCities);

// get city by ID

router.get('/:id', getCity);

router.post('/', addCity);

router.post('/:id/documents', authenticated, addCityDocument);

router.delete('/:id', authenticated, deleteCity);

router.delete('/', authenticated, deleteCities);

export default router;
