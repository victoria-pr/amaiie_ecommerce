import mongoose from "mongoose"; //Importamos la librería mongoose para el esquema de la base de datos de los usuarios

const userSchema = new mongoose.Schema(
  {
    //Objeto con los elementos de los usuarios
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    image: { type: String, required: false },
    description: { type: String, required: false },
    adress: { type: String, required: false },
    video: { type: String, required: false },

    isArtist: { type: Boolean, default: false, required: false },
    isAdmin: { type: Boolean, default: false, required: false },
  },

  {
    //para que mongoose cree la fecha actualizada de creación y actualización de datos
    timestamps: false,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
