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
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
// import dotenv from 'dotenv';
//dotenv.config();
const env_var_1 = require("../../config/plugin/env-var");
const mongoUrl = env_var_1.envs.MONGO_URI;
const dbName = env_var_1.envs.MONGO_DB_NAME;
const username = env_var_1.envs.MONGO_USER;
const password = env_var_1.envs.MONGO_PASS;
const connectionOptions = { dbName, auth: { username, password } };
const mongoDB = (callback, reset) => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default
        .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            user: connectionOptions.auth.username,
            password: connectionOptions.auth.password,
        },
    })
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        if (reset) {
            yield mongoose_1.default.connection.dropDatabase();
        }
        console.log(colors_1.default.green.bold.italic("Connected to MongoDB"), reset ? colors_1.default.red.italic("| Initial dropped") : "");
    }))
        .then(() => {
        callback();
    })
        .catch((error) => {
        console.log(colors_1.default.bgRed.italic("Failed to connect to MongoDB"));
        console.error("Failed to connect to MongoDB:", error);
    });
});
exports.default = mongoDB;
//# sourceMappingURL=connection.js.map