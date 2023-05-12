import mongoose from "mongoose"; //Importamos la librería mongoose para la base de datos del los productos
//Esquema de la base de datos de productos
const productSchema = new mongoose.Schema(
  {
    nameproduct: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    countinStock: { type: Number, required: true },
    price: { type: Number, required: true },
    createdate: { type: Date, required: true },
    idartist: { type: mongoose.Types.ObjectId, ref: "owner", required: true },

    category: {
      type: String,
      required: false,
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
      ],
    },
  },
  {
    freezeTableName: true,
    tymestamps: false, //el último dato actualizado de los productos
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
