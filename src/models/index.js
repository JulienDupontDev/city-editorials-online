import mongoose from 'mongoose';

import City from './city.js';
import Document from './document.js';
import User from './user.js';

const connectDb = () => {
  console.log(
    'testaaaaaaaaaa',
    process.env['DATABASE_URL' + process.env.ENV],
  );
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
