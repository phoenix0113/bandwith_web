import mongoose from 'mongoose';
import { conf } from '../config';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(conf.mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
