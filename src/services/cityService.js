import IncomingForm from 'formidable/src/Formidable';
import formidable from 'formidable';
import mongoose from 'mongoose';
import models from '../models';
import { uploadFile } from './awsService';

export const addCity = async (req, res) => {
  try {
    const city = await models.City.create(req.body);
    res.send(city);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getCity = async (req, res) => {
  try {
    const city = await models.City.findById(req.params.id);
    if (!city) {
      res.sendStatus(404);
    }
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

export const deleteCities = async (req, res) => {
  try {
    await models.City.remove({
      _id: {
        $in: req.body.ids,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const addCityDocument = async (req, res) => {
  try {
    const { document } = req.files;
    const city = await models.City.findById(req.params.id);

    if (!city) {
      res.sendStatus(404);
    }

    const date = new Date();

    const filename = `${
      city._id
    }/${date.getMonth()}_${date.getFullYear()}/${date.getTime()}`;
    const result = await uploadFile({
      file: req.files.document.data,
      name: filename,
    });

    if (!result) {
      throw Error();
    }

    const newDocument = new models.Document({
      id: mongoose.Types.ObjectId(),
      name: document.name,
      url: result.Location,
      createdAt: new Date(),
    });

    city.documents.push(newDocument);

    await city.save();
    // const city = await models.City.findByIdAndUpdate(req.params.id, {
    //   $push: {
    //     documents: new models.Document({
    //       id: mongoose.Types.ObjectId(),
    //       name: 'test',
    //       url: 'https://',
    //       createdAt: new Date(),
    //     }),
    //   },
    // }).exec();

    // res.send(city);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};
