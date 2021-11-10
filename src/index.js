import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// * Routes * //

app.use('/cities', routes.city);

// * Start * //

const eraseDatabaseOnSync = true;

connectDb()
  .then(async () => {
    if (eraseDatabaseOnSync) {
      await Promise.all([models.City.deleteMany({})]);

      createUsersWithMessages();
    }

    app.listen(process.env.PORT, () =>
      console.log(
        `Example app listening on port ${process.env.PORT}!`,
      ),
    );
  })
  .catch((err) => console.log(err, 'putain derreur'));

// * Database Seeding * //

const createUsersWithMessages = async () => {
  const cityOne = new models.City({
    name: 'test',
    zipcode: 91800,
    country: 'France',
  });

  await cityOne.save();
};
