//Funciones relacionadas con la generación y verificación de JSON WebTokens
import jwt from "jsonwebtoken";
//FUNCION DE GENERACION: Recibimos un objeto de usuario como argumento y generamos un JWT en base a los datos
//JWT_SECRET en env.
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      description: user.description,
      isAdmin: user.isAdmin,
      isArtist: user.isArtist,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d", // 30 dias de expiracion del token por lo que el usuario no tendra que iniciar sesion cada vez que entre a la pagina en ese periodo de tiempo
    }
  );
};
//FUNCION DE VERIFICACION: middleware para verificad que el usuario está autenticado
//Extraemos el token y verificamos su validez utilizando la clave secreta
//Si es válida, decodifica la información del usuario contenida en el token y agrega la info al objeto para usarlo en otras partes de la aplicación
//Si no es válida, envía mensaje de token inválido y que no se proporcionado ningún token
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // se carga la palabra "Bearer" y solo coge el resto de caracteres XXXXXX como token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
//FUNCION DE VERIFICACION (ADMINISTRADOR): middleware para verificar si un usuario es administrador
//Si es adminsitrador llama a la función next para permitir el paso a la siguiente función y si no manda mensaje de token no válido
export const isAdmin = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isArtist)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin or Artist Token" });
  }
};
