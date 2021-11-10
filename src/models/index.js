import mongoose from 'mongoose';

import City from './city';

const connectDb = () => {
  return mongoose.connect(
    'mongodb://api:api@mongo:27017/cities?authSource=admin',
  );
};

const models = { City };

export { connectDb };

export default models;
