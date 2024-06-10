"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    _id: {
        type: Schema.Types.Mixed, // Permite ObjectId o strings
        default: mongoose_2.SchemaTypes.ObjectId,
    },
    id: { type: mongoose_2.SchemaTypes.String, required: true },
    displayName: { type: mongoose_2.SchemaTypes.String, required: true },
    name: {
        familyName: { type: mongoose_2.SchemaTypes.String, required: true },
        givenName: { type: mongoose_2.SchemaTypes.String, required: true }
    },
    emails: [
        {
            value: { type: mongoose_2.SchemaTypes.String, required: true },
            verified: { type: mongoose_2.SchemaTypes.Boolean, required: true }
        }
    ],
    photos: [
        {
            value: { type: mongoose_2.SchemaTypes.String, required: true }
        }
    ],
    provider: { type: mongoose_2.SchemaTypes.String, required: true },
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.model.js.map