import { Router } from 'express';
import models from '../models/index.js';
import { login } from '../services/userService.js';

const router = Router();

router.post('/login', login);

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.post('/');

router.get('/:userId', async (req, res) => {
  const user = await models.User.findById(req.params.userId);
  return res.send(user);
});

export default router;
