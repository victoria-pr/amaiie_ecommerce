import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    /* resetToken: { type: String },*/

    image: { type: String, required: false },
    adress: { type: String, required: false },
    video: { type: String, required: false },

    isArtist: { type: Boolean, default: false, required: false },
    isAdmin: { type: Boolean, default: false, required: false },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
