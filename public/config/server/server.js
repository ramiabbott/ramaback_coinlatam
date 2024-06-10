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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const env_var_1 = require("../plugin/env-var");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const User_model_1 = require("../../database/mongo/model/User.model");
const index_routes_1 = __importDefault(require("../../routes/index.routes"));
const uuid_1 = require("uuid");
const request_ip_1 = __importDefault(require("request-ip"));
//% Initial Methods:
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.set("trust proxy", true);
server.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// server.name = "API";
server.use(request_ip_1.default.mw());
server.use(body_parser_1.default.urlencoded({ extended: true, limit: "1000mb" }));
server.use(body_parser_1.default.json({ limit: "1000mb" }));
server.use((0, cookie_parser_1.default)());
// DEBUG
server.use((0, morgan_1.default)("dev"));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, OPTIONS, PUT, DELETE");
    next();
});
// Configuración de la sesión
server.use((0, express_session_1.default)({
    secret: env_var_1.envs.SESION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
server.use(passport_1.default.initialize());
server.use(passport_1.default.session());
//Configuracion de estatregia de google
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_var_1.envs.CLIENT_ID,
    clientSecret: env_var_1.envs.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Encuentra al usuario basado en su ID de Google
        let user = yield User_model_1.UserModel.findOne({ id: profile.id });
        if (user) {
            return done(null, user);
        }
        // Si no existe el usuario, créalo
        user = new User_model_1.UserModel({
            _id: (0, uuid_1.v4)(),
            id: profile.id,
            provider: profile.provider,
            name: {
                givenName: (_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName,
                familyName: (_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName,
            },
            emails: profile.emails,
            photos: profile.photos,
            displayName: profile.displayName,
            // otros campos que pueda tener tu usuario
        });
        yield user.save();
        done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
// Serialización del usuario
passport_1.default.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
});
// Deserialización del usuario
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
server.use("/", index_routes_1.default);
//$ ERROR CATCHING.
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
//$ END.
exports.default = server;
//# sourceMappingURL=server.js.map