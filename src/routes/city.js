import { Router } from 'express';
import {
  addCity,
  addCityDocument,
  deleteCities,
  deleteCity,
  getCities,
  getCity,
} from '../services/cityService';

const router = Router();

// get all cities
router.get('/', getCities);

// get city by ID

router.get('/:id', getCity);

router.post('/', addCity);

router.post('/:id/documents', addCityDocument);

router.delete('/:id', deleteCity);

router.delete('/', deleteCities);

export default router;
