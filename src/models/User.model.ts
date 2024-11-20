import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../utils/interface';

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: false,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const User = mongoose.model<IUser>('User', userSchema)
export default User;