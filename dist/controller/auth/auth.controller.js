"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedGet = exports.firstAuthenticate = exports.secondAuthenticate = exports.unauthorizedGet = exports.logoutGet = exports.ipGet = void 0;
const passport_1 = __importDefault(require("passport"));
const env_var_1 = require("../../config/plugin/env-var");
const request_ip_middleware_1 = require("../../middleware/request-ip/request-ip.middleware");
const ipGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req;
        const ipClient = require;
        const apiKey = env_var_1.envs.IPDATA_KEY;
        const geoInfo = yield (0, request_ip_middleware_1.getGeoInfo)(user, apiKey);
        res.json({
            ip: (0, request_ip_middleware_1.addressIp)(req), // Espera a que getAddressIp() se resuelva
            geo: request_ip_middleware_1.getGeoInfo || 'No se pudo determinar la ubicación de la IP'
        });
    }
    catch (error) {
        throw (error);
    }
});
exports.ipGet = ipGet;
const logoutGet = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });
};
exports.logoutGet = logoutGet;
const unauthorizedGet = (req, res) => {
    res.status(401).send("unauthorized user");
};
exports.unauthorizedGet = unauthorizedGet;
const secondAuthenticate = (req, res) => {
    try {
        passport_1.default.authenticate('google', {
            failureRedirect: '/auth/google/unauthorized',
            successRedirect: '/protected',
        })(req, res);
        return;
    }
    catch (error) {
        throw error;
    }
};
exports.secondAuthenticate = secondAuthenticate;
const firstAuthenticate = (req, res, next) => {
    const clientGoogle = passport_1.default.authenticate("google", { scope: ['email', 'profile'] });
    try {
        if (clientGoogle) {
            res.status(200).redirect("/auth/google/callback");
        }
        else
            console.log("Error al logearse");
    }
    catch (error) {
        throw error;
    }
};
exports.firstAuthenticate = firstAuthenticate;
const isLoggedGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Hacemos una conversión de tipo
    if (!user || !user.photos || !user.photos.length || !user.emails || !user.emails.length || !user.provider) {
        return res.status(400).send('User profile is incomplete.');
    }
    res.send(`
      <img width=80 src="${user.photos[0].value}" />
      <h1>Hello ${user.displayName}</h1>
      <h4>Your email: ${user.emails[0].value}</h4>
      <h4>Your provider: ${user.provider}</h4>
      <a href="/logout">Logout</a>
    `);
});
exports.isLoggedGet = isLoggedGet;
//# sourceMappingURL=auth.controller.js.map