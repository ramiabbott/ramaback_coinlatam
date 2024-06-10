import mongoose, { SchemaTypeOptions } from 'mongoose';
import { SchemaTypes, Document } from 'mongoose';
import { Profile } from 'passport';

const Schema = mongoose.Schema

export interface IUser extends Profile, Document {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    emails: {
        value: string;
        verified: boolean;
    }[];
    photos: {
        value: string;
    }[];
    provider: string;
}

const UserSchema = new Schema<IUser>({
    _id: {
        type: Schema.Types.Mixed, // Permite ObjectId o strings
        default: SchemaTypes.ObjectId,
      },
    id: { type: SchemaTypes.String, required: true },
    displayName: { type: SchemaTypes.String, required: true },
    name: {
        familyName: { type: SchemaTypes.String, required: true },
        givenName: { type: SchemaTypes.String, required: true }
    },
    emails: [
        {
            value: { type: SchemaTypes.String, required: true },
            verified: { type: SchemaTypes.Boolean, required: true }
        }
    ],
    photos: [
        {
            value: { type: SchemaTypes.String, required: true }
        }
    ],
    provider: { type: SchemaTypes.String , required: true },
})

export const UserModel = mongoose.model('User', UserSchema);
