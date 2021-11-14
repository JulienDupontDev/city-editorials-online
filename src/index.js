import 'dotenv/config.js';
import cors from 'cors';
import express from 'express';

import models, { connectDb } from './models/index.js';
import routes from './routes/index.js';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
const app = express();
let mongoDB;
// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  }),
);

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //

app.use('/cities', routes.city);

app.use('/users', routes.user);

app.use('/', (req, res) => {
  res.send('hello');
});
7;
connectDb()
  .then(async () => {
    mongoDB = mongoose;
    if (process.env.ENV === 'PREPROD') {
      await Promise.all([
        models.City.deleteMany({}),
        models.User.deleteMany({}),
      ]);
    }

    app.listen(process.env.PORT, () => {});
  })
  .catch((err) => console.log(err, 'putain derreur'));

export const getMongoDBInstance = () => mongoDB;

export default app;
