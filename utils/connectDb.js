import mongoose from 'mongoose';

const connectDb = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Using existing connection');
    return;
  }
  // use new databse connection
  mongoose
    .connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      console.log('DB Connected', db.connections[0].readyState);
    })
    .catch(err => console.log(err));
};

export default connectDb;
