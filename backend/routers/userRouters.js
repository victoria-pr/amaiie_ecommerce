import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; //para el hashing de las contraseñas
import { isAuth, generateToken } from "../utils.js";
import expressAsyncHandler from "express-async-handler"; //para manejar los errores asíncronos de las rutas
import upload from "../middlewares/multer.js"; //carga de imágenes
import Product from "../models/productModel.js";
//Rutas relacionadas con la autentificación y gestión de usuarios
const userRouter = express.Router();
//RUTA GET: para obtener todos los usuarios
userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users); //usuarios en formato JSON
});
//RUTA GET: para obtener un usuarios específico por su username
userRouter.get(
  "/username/:username",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
//RUTA GET: para obtener todos los productos asociados a un usuario con el parámetro username
userRouter.get(
  "/:username/products",
  expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    console.log(username);
    const products = await Product.find({ user: username });
    console.log(products);
    res.send(products);
  })
);
//RUTA POST: para la autentificación de  los usuarios, verifica si existe en la base de datos y compara con la contraseña almacenada
//Si la autentificación es correcta, se envia una respuesta con la información del usuario y el token generado por bcrypt
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // bcrypt.compareSync compara la contraseña ingresada con la contraseña encriptada en la base de datos
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
          description: user.description,
          isAdmin: user.isAdmin,
          isArtist: user.isArtist,
          token: generateToken(user),
        });
        return; // si la contraseña es correcta, se envia la respuesta y se termina la funcion
      }
    }
    res.status(401).send({ message: "Invalid username or password" });
  })
);
//RUTA POST: ruta para registro de nuevos usuarios, la contraseña se encripta
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      isArtist: req.body.isArtist,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      description: user.description,
      isAdmin: user.isAdmin,
      isArtist: user.isArtist,
      token: generateToken(user),
    });
  })
);
//RUTA PUT: para actualizar el perfil del usuario autentificado
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        description: updatedUser.description,
        isAdmin: updatedUser.isAdmin,
        isArtist: updatedUser.isArtist,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
//RUTA PUT: Para editar y actualizar el perfil de un usuario con un id expecífico
userRouter.put(
  "/editprofile",
  [isAuth, upload.single("image")],
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.description = req.body.description || user.description;
      if (req.file) {
        console.log(req.file);
        user.image = req.file.filename; // Asigna la ruta de la imagen guardada a 'user.image'
      }

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      //guarda la actualización y envía una respuesta con los datos del usuario actualizados
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        description: updatedUser.description,
        isAdmin: updatedUser.isAdmin,
        isArtist: updatedUser.isArtist,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        description: updatedUser.description,
        isAdmin: updatedUser.isAdmin,
        isArtist: updatedUser.isArtist,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

userRouter.put(
  "/editprofile",
  [isAuth, upload.single("image")],
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.description = req.body.description || user.description;
      if (req.file) {
        console.log(req.file);
        user.image = req.file.filename; // Asigna la ruta de la imagen guardada a 'user.image'
      }

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        description: updatedUser.description,
        isAdmin: updatedUser.isAdmin,
        isArtist: updatedUser.isArtist,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default userRouter;
