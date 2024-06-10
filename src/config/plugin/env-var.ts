import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),


  PROD: env.get("PROD").required().asBool(),
  MONGO_URI: env.get("MONGO_URI").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),
  MONGO_BASICAUTH: env.get("MONGO_BASICAUTH").required().asBool(),
  INITIALDROPDB: env.get("INITIALDROPDB").required().asBool(),
  CONNECTDB: env.get("CONNECTDB").required().asBool(),

  CLIENT_ID: env.get("CLIENT_ID").required().asString(),
  CLIENT_SECRET: env.get("CLIENT_SECRET").required().asString(),

  SESION_SECRET: env.get("SESION_SECRET").required().asString(),
  IPDATA_KEY: env.get("IPDATA_KEY").required().asString()
};