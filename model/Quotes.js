//* * Connect to mongolab */
import mongoose from 'mongoose';

const Quote = new mongoose.Schema({
  cost: {
    type: Number,
    require: true,
  },
});

export default mongoose.model('Quotes', Quote);
