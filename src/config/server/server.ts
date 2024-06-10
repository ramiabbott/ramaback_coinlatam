import express, { Express, Request, Response, NextFunction, Router } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import session from 'express-session';
import { envs } from "../plugin/env-var";
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import passport from "passport"
import { IUser, UserModel as User } from "../../database/mongo/model/User.model"
import route from "../../routes/index.routes";
import { v4 as uuid } from "uuid"; 
import requestIp from 'request-ip';




//% Initial Methods:
const server: Express = express();
server.use(cors());
server.set("trust proxy", true);


server.use(express.static(path.join(__dirname, "public")));
// server.name = "API";
server.use(requestIp.mw())

server.use(bodyParser.urlencoded({ extended: true, limit: "1000mb" }));
server.use(bodyParser.json({ limit: "1000mb" }));
server.use(cookieParser());
// DEBUG
server.use(morgan("dev"));
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, POST, OPTIONS, PUT, DELETE"
  );
  next();
});

// Configuración de la sesión
server.use(session({
  secret: envs.SESION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


server.use(passport.initialize());
server.use(passport.session());

//Configuracion de estatregia de google
passport.use(new GoogleStrategy({
  clientID: envs.CLIENT_ID,
  clientSecret: envs.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {

  try {
    // Encuentra al usuario basado en su ID de Google
    let user:IUser = await User.findOne({ id: profile.id });
    if (user) {
      return done(null, user);
    }

    // Si no existe el usuario, créalo
    user = new User({
      _id: uuid(),
      id: profile.id,
      provider: profile.provider,
      name: {
        givenName: profile.name?.givenName,
        familyName: profile.name?.familyName,
      },
      emails: profile.emails,
      photos: profile.photos,
      displayName: profile.displayName,
      // otros campos que pueda tener tu usuario
    });
    await user.save();
    done(null, user);
  } catch (error) {
    done(error);
  }
  }));



// Serialización del usuario
passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user);
});

// Deserialización del usuario
passport.deserializeUser((user: Profile, done) => {
  done(null, user);
});

server.use("/", route);
//$ ERROR CATCHING.
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//$ END.

export default server;