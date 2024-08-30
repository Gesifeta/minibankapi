import mongoose from "mongoose";

const connectDB = async () => {
  try {
    return await mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_DB_ATLAS_USER}:${process.env.MONGO_DB_ATLAS_PASSWORD}@${process.env.MONGO_DB_ATLAS_IP}/minibank?retryWrites=true&w=majority&appName=Cluster0`,
        { useUnifiedTopology: true }
      )
      .then(() => {
        console.log(`Database connected`);
      })
      .catch((err) => {
        console.log(`Error connecting to database: ${err.message}`);
      });
  } catch (error) {
    return `Error connecting to database: ${error.message}`;
  }
};
export default connectDB;
