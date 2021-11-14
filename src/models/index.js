import mongoose from 'mongoose';

import City from './city.js';
import Document from './document.js';
import User from './user.js';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { City, Document, User };

export { connectDb };

export default models;
