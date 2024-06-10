"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../../controller/auth/auth.controller");
const route = (0, express_1.Router)();
exports.authRoute = route;
route.get("/auth/google", passport_1.default.authenticate("google", { scope: ['email', 'profile'] }));
route.get("/auth/google/callback", passport_1.default.authenticate('google', {
    failureRedirect: '/auth/google/unauthorized',
    successRedirect: '/protected',
}));
route.get("/auth/google/unauthorized");
route.get('/logout', auth_controller_1.logoutGet);
//# sourceMappingURL=auth.routes.js.map