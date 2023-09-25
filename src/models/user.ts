import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
