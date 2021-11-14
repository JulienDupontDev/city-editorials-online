import mongoose from 'mongoose';

import City from './city';
import Document from './document';
import User from './user';

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
