import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
//updated 123
const UserSchema = new mongoose.Schema({})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema)

export default User; 