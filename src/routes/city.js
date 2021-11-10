import { Router } from 'express';
import {
  addCity,
  addCityDocument,
  deleteCity,
  getCities,
} from '../services/cityService';

const router = Router();

// @route   GET api/city
router.get('/', getCities);

router.post('/', addCity);

router.post('/:id/documents', addCityDocument);

router.delete('/:id', deleteCity);

export default router;
