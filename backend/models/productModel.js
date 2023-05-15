<<<<<<< HEAD
import mongoose from 'mongoose';

=======
import mongoose from "mongoose"; //Importamos la librería mongoose para la base de datos del los productos
//Esquema de la base de datos de productos
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
const productSchema = new mongoose.Schema(
  {
    nameproduct: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
<<<<<<< HEAD
);const Product = mongoose.model('Product', productSchema);
export default Product;

=======
);
const Product = mongoose.model("Product", productSchema);
export default Product;

/*   idartist: { type: mongoose.Types.ObjectId, ref: "owner", required: true }, */

/* category: {
      type: String,
      required: true,
      enum: [
        "clothing",
        "decoration",
        "painting",
        "photography",
        "jewelry",
        "ceramic",
        "paper",
        "miniatures",
        "soaps and candels", 
      ],*/
/*   },

  {
    tymestamps: true, //el último dato actualizado de los productos
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
 */
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
