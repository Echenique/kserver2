import { Schema, model } from 'mongoose';

const UserAccountSchema = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, select: false, require: true},
    name: {type: String},
    level: {type: String},
    gender: {type: String},
    token: {type: String},
    birth: {type: Date},
    lastLogin: {type: Date},
    photo: {type: String},
    city: {type: Schema.Types.ObjectId, ref: 'City'},
    
})

let UserModel = model('UserAccount', UserAccountSchema);
export default UserModel;