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
exports.testRoute = void 0;
const express_1 = __importDefault(require("express"));
const env_var_1 = require("../../config/plugin/env-var");
const request_ip_middleware_1 = require("../../middleware/request-ip/request-ip.middleware");
const route = express_1.default.Router();
exports.testRoute = route;
// Función para obtener información de geolocalización desde ipdata.co
route.get('/test', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = env_var_1.envs.IPDATA_KEY;
        const geoInfo = yield (0, request_ip_middleware_1.getGeoInfo)(req, apiKey);
        res.json({
            ip: (0, request_ip_middleware_1.addressIp)(req), // Espera a que getAddressIp() se resuelva
            geo: geoInfo || 'No se pudo determinar la ubicación de la IP'
        });
        next();
    }
    catch (error) {
        throw (error);
    }
}));
//# sourceMappingURL=test.routes.js.map