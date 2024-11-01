import mongoose from "mongoose";
import colors from "colors";

// connecting db

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://mtk:pass123@atlascluster.cfbrgp8.mongodb.net/Ecommerce-App"
    );
    console.log(
      `Connected To Mongodb Database${conn.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.error(`Error in mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
