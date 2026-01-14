// mongoose import
import mongoose from "mongoose";

// database connect function
const connectDB = async () => {
  try {
    // mongoDB connect
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    // error आए तो दिखाओ
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
