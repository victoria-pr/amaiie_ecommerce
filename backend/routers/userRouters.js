
import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { isAuth, generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();

userRouter.get("/username/:username", 
expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
})
)


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

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
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

userRouter.put(
  '/profile',
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
      res.status(404).send({ message: 'User not found' });
    }
  })
);

  userRouter.put(
    '/editprofile',
    [isAuth, upload.single('image')],
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.description = req.body.description || user.description;
        if (req.file) {
          console.log(req.file)
          user.image = req.file.path; // Asigna la ruta de la imagen guardada a 'user.image'
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
        res.status(404).send({ message: 'User not found' });
      }
    })
);

export default userRouter;