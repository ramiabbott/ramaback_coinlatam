import mongoose from "mongoose";
// import dotenv from 'dotenv';
//dotenv.config();
import { envs } from "../../config/plugin/env-var";

interface ConnectionOption {

  dbName: string;

  auth: {
    username: string;
    password: string;
  };

}

const mongoUrl = envs.MONGO_URI;
const dbName = envs.MONGO_DB_NAME;
const username = envs.MONGO_USER;
const password = envs.MONGO_PASS;

const connectionOptions: ConnectionOption = { dbName, auth: { username, password } };

const mongoDB = async (callback: () => void, reset: boolean) => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: connectionOptions.auth.username,
        password: connectionOptions.auth.password,
      },
    })
    .then(async () => {
      if (reset) {
        await mongoose.connection.dropDatabase();
      }
      console.log("Connected to MongoDB", reset ? "| Initial dropped" : "");
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB")
      console.error("Failed to connect to MongoDB:", error);
    });
};

export default mongoDB;