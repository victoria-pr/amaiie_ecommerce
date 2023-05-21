//Creamos el multerpro porque cambiamos la forma de guarda las imágenes de los productos con su ID
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //el archivo se guarda en la carpeta uploads dentro de la carpeta publicback
    const dirname = path.resolve(); //obtenemos la ruta del directorio
    cb(null, path.join(dirname, "publicback", "fotoproducto")); //concatenamos con las dos carpetas para la ruta completa
  },
  filename: function (req, file, cb) {
    const id = req.params.id;
    const extname = path.extname(file.originalname); // Obtenemos la extensión del archivo original (jpg en este caso)
    const fileName = id + extname; // Generamos el nombre del archivo usando el username del usuario y la extensión original (lo unimos al ID)

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
