import mongoose from 'mongoose';
import models from '../models';

export const addCity = async (req, res) => {
  try {
    const city = await models.City.create(req.body);
    res.send(city);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await models.City.find();
    res.send(cities);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteCity = async (req, res) => {
  try {
    await models.City.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const addCityDocument = async (req, res) => {
  try {
    const city = await models.City.findByIdAndUpdate(req.params.id, {
      $push: {
        documents: new models.Document({
          id: mongoose.Types.ObjectId(),
          name: 'test',
          url: 'https://',
          createdAt: new Date(),
        }),
      },
    }).exec();

    res.send(city);
  } catch (error) {
    res.send(error.message);
  }
};
