//Importamos Multer y Path, bibliotecas de Node.js para la carga de archivos y manejo de rutas
import multer from "multer";
import path from "path";
//Función para almacenar los archivos cargados
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //el archivo se guarda en la carpeta uploads dentro de la carpeta publicback
    const dirname = path.resolve();
    cb(null, path.join(dirname, "publicback", "uploads"));
  },
  filename: function (req, file, cb) {
    const username = req.user.username; // Obtiene el username del usuario desde 'req.user.username'
    const extname = path.extname(file.originalname); // Obtiene la extensión del archivo original (jpg)
    const fileName = username + extname; // Genera el nombre del archivo, usando el username del usuario y la extensión original
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
