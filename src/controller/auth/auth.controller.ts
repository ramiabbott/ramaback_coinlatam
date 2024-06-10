import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { envs } from "../../config/plugin/env-var";
import { addressIp, getGeoInfo } from "../../middleware/request-ip/request-ip.middleware"
import { IUser } from "../../database/mongo/model/User.model";


export const ipGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req
        const ipClient = require
        const apiKey = envs.IPDATA_KEY;
        const geoInfo = await getGeoInfo(user, apiKey);

        res.json({
            ip: addressIp(req), // Espera a que getAddressIp() se resuelva
            geo: getGeoInfo || 'No se pudo determinar la ubicación de la IP'
        });

    } catch (error) {
        throw (error)
    }
};

export const logoutGet = (req: Request, res: Response, next: NextFunction) => {
    req.logout(err => {
        if (err) { return next(err); }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });

    });
}

export const unauthorizedGet = (req: Request, res: Response) => {
    res.status(401).send("unauthorized user");
}

export const secondAuthenticate = (req: Request, res: Response) => {
    try {
        passport.authenticate('google', {
            failureRedirect: '/auth/google/unauthorized',
            successRedirect: '/protected',
        })(
            req,
            res
        )
        return
    } catch (error) {
        throw error
    }
}

export const firstAuthenticate = (req: Request, res: Response, next: NextFunction) => {
    const clientGoogle = passport.authenticate("google", { scope: ['email', 'profile'] })
    try {
        if (clientGoogle) {
            res.status(200).redirect("/auth/google/callback")
        }
        else console.log("Error al logearse")
    } catch (error) {
        throw error
    }
}



export const isLoggedGet = async (req: Request, res: Response) => {
    const user = req.user as IUser; // Hacemos una conversión de tipo

    if (!user || !user.photos || !user.photos.length || !user.emails || !user.emails.length || !user.provider) {
        return res.status(400).send('User profile is incomplete.');
    }

    res.send(`
      <img width=80 src="${user.photos[0].value}" />
      <h1>Hello ${user.displayName}</h1>
      <h4>Your email: ${user.emails[0].value}</h4>
      <h4>Your provider: ${user.provider}</h4>
      <a href="/logout">Logout</a>
    `)
}