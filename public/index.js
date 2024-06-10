"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const server_1 = __importDefault(require("./config/server/server"));
const connection_1 = __importDefault(require("./database/mongo/connection"));
const env_var_1 = require("./config/plugin/env-var");
const initialDropDB = env_var_1.envs.INITIALDROPDB;
const PORT = env_var_1.envs.PORT;
const connectDB = env_var_1.envs.CONNECTDB;
//$ SERVER START:
const upServer = () => {
    server_1.default.listen(PORT, () => {
        console.log(colors_1.default.italic(`Server listening on port ${PORT}`));
    });
};
connectDB ? (0, connection_1.default)(upServer, initialDropDB) : upServer();
//# sourceMappingURL=index.js.map