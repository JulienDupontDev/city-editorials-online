import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  documents: [
    {
      type: Array,
    },
  ],
});

const City = mongoose.model('City', citySchema);

export default City;
