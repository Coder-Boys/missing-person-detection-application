import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error connecting mongodb", error);
  }
};

export default connectMongoDB;
