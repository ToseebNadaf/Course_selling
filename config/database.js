import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};

export default connectDB;
