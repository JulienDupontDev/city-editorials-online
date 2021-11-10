import mongoose from 'mongoose';

import City from './city';
import Document from './document';
import User from './user';

const connectDb = () => {
  return mongoose.connect(
    'mongodb://api:api@mongo:27017/cities?authSource=admin',
    { useFindAndModify: false },
  );
};

const models = { City, Document, User };

export { connectDb };

export default models;
