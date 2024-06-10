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
exports.getGeoInfo = exports.addressIp = void 0;
const request_ip_1 = __importDefault(require("request-ip"));
const axios_1 = __importDefault(require("axios"));
const addressIp = (req) => {
    const ip = request_ip_1.default.getClientIp(req);
    return ip;
};
exports.addressIp = addressIp;
const getGeoInfo = (req, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user) {
        throw new Error('User is undefined');
    }
    const ipClient = (0, exports.addressIp)(req);
    if (!ipClient) {
        throw new Error('IP address not found');
    }
    const url = `https://api.ipdata.co/${ipClient}?api-key=${apiKey}`;
    try {
        const response = yield axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching geolocation: ${error}`);
        return null;
    }
});
exports.getGeoInfo = getGeoInfo;
//# sourceMappingURL=request-ip.middleware.js.map