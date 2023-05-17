import multer from "multer";
import path from "path";

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { //el archivo se guarda en la carpeta uploads dentro de la carpeta publicback
        const dirname = path.resolve();
        cb(null, path.join(dirname, "publicback", "uploads"));
    }
    , filename: function (req, file, cb) {
        const username = req.user.username; // Obtén el ID del usuario desde 'req.user._id'
        const extname = path.extname(file.originalname); // Obtén la extensión del archivo original
        const fileName = username + extname; // Genera el nombre del archivo usando el ID del usuario y la extensión original
        cb(null, fileName);
      },
    });

const fileFilter = (req, file, cb) => { //middleware para filtrar archivos que no sean .jpg
    if (!file.originalname.match(/\.(jpg)$/)) {
        return cb("Solo se permiten archivos .jpg");
    }
    cb(null, true);
}


const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;