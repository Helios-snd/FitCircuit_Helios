import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  clerkUserId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String },
});

export default model('User', UserSchema);

