import { IRouter, Router } from "express";
import passport from "passport";
import { firstAuthenticate, logoutGet, secondAuthenticate, unauthorizedGet } from "../../controller/auth/auth.controller";


const route: IRouter = Router();

route.get("/auth/google", passport.authenticate("google", { scope: ['email', 'profile'] }));

route.get("/auth/google/callback", passport.authenticate('google', {
    failureRedirect: '/auth/google/unauthorized',
    successRedirect: '/protected',}));

route.get("/auth/google/unauthorized", );

route.get('/logout', logoutGet );



export { route as authRoute }
