import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign( 
    { 
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET, 
    {
        expiresIn: "30d", // 30 dias de expiracion del token por lo que el usuario no tendra que iniciar sesion cada vez que entre a la pagina en ese periodo de tiempo
    }
    );
};