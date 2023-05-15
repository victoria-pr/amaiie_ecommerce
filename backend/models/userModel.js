import mongoose from "mongoose";

<<<<<<< HEAD
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  /* resetToken: { type: String }, */  image: { type: String, required: false },
  adress: { type: String, required: false },
  video: { type: String, required: false },  isArtist: { type: Boolean, default: false, required: false },
  isAdmin: { type: Boolean, default: false, required: false },
},
{
  typestamps: false,
});const User = mongoose.model("User", userSchema);
=======
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
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
export default User;


