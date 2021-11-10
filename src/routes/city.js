import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const cities = await req.context.models.City.find();
  return res.send(cities);
});

export default router;
