import IncomingForm from 'formidable/src/Formidable';
import formidable from 'formidable';
import mongoose from 'mongoose';
import models from '../models';
import { uploadFile } from './awsService';
import UserService from './userService.js';

const hasAccessToRessource = (city, user) => {
  for (let i = 0; i < city.admins.length; i++) {
    if (city.admins[i]._id.toString() === user.id.toString()) {
      return true;
    }
  }

  if (user.roles && user.roles.includes('admin')) {
    return true;
  }

  return false;
};

export const addCity = async (req, res) => {
  try {
    UserService.register(req.body.user)
      .then((user) => {
        if (!user) {
          throw Error(
            "une erreur est survenue lors de la création de l'utilisateur",
          );
        }

        models.City.create({
          ...req.body,
          admins: [user._id],
        })
          .then((city) => {
            if (!city) {
              throw Error();
            }
            res.send(city);
          })
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.send(err));
  } catch (error) {
    res.status(400).send(error.message);
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
    const city = await models.City.findById(req.params.id);

    if (!hasAccessToRessource(city, req.user)) {
      res.sendStatus(403);
    }
    city.remove();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteCities = async (req, res) => {
  try {
    const { ids } = req.body;
    let errors = [];
    for (let i = 0; i < ids.length; i++) {
      if (!hasAccessToRessource(ids[i], req.user)) {
        errors.push(ids[i]);
        continue;
      }
      await models.City.remove({
        _id: ids[i],
      });
    }
  } catch (error) {
    res
      .status(500)
      .send(
        "Vous n'avez pas l'autorisation sur les villes suivantes" +
          errors.join(', '),
      );
  }
};

export const addCityDocument = async (req, res) => {
  try {
    const { document } = req.files;
    const city = await models.City.findById(req.params.id);

    const hasAccess = hasAccessToRessource(city, req.user);
    if (!hasAccess) {
      res.sendStatus(403);
    }

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
