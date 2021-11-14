import models from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  models.User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.status(400).json({
        message: 'User not found',
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(400).json({
          message: 'Password is incorrect',
        });
      }

      if (result) {
        res.send({
          firstName: user.firstName,
          lastName: user.lastName,
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
        });
      }
    });
  });
};

const register = async (data) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phoneNumber,
  } = data;

  return new Promise((resolve, reject) => {
    if (password !== confirmPassword) {
      reject(Error('Passwords do not match'));
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(Error('Une erreur e&st survenue'));
      }

      models.User.create({
        firstName,
        lastName,
        email,
        password: hash,
        phoneNumber,
      })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export default {
  register,
};
