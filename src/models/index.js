import mongoose from 'mongoose';

import City from './city.js';
import Document from './document.js';
import User from './user.js';

let mongoDB;

const connectDb = async () => {
  return mongoose.connect(
    process.env[`DATABASE_URL_${process.env.ENV}`],
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
};

const models = { City, Document, User };

export { connectDb };

export default models;
