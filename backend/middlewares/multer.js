import multer from "multer";
import path from "path";

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { //el archivo se guarda en la carpeta uploads dentro de la carpeta publicback
        const dirname = path.resolve();
        cb(null, path.join(dirname, "publicback", "uploads"));
    }
    , filename: function (req, file, cb) {
        const username = req.user.username; // Obtén el username del usuario desde 'req.user.username'
        const extname = path.extname(file.originalname); // Obtén la extensión del archivo original (jpg en este caso)
        const fileName = username + extname; // Genera el nombre del archivo usando el username del usuario y la extensión original
        cb(null, fileName);
      },
    });


const upload = multer({ storage: storage });

export default upload;
