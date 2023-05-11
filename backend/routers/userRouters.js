import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.post(
    '/signin', expressAsyncHandler(async (req, res) => { // expressAsyncHandler es un middleware que maneja errores asyncronos
        const user = await User.findOne({ email: req.body.username });
        if(user) { 
            if(bcrypt.compareSync(req.body.password, user.password)) { // bcrypt.compareSync compara la contraseña ingresada con la contraseña encriptada en la base de datos
                res.send({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user),
                });
                return; // si la contraseña es correcta, se envia la respuesta y se termina la funcion
            }
        }
        res.status(401).send({ message: 'Invalid username or password' });
             
    })
);

export default userRouter;