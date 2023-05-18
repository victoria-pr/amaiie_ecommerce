import mongoose from "mongoose"; //Importamos la librería mongoose para la base de datos del los productos
//Esquema de la base de datos de productos
const productSchema = new mongoose.Schema(
  {
    nameproduct: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    user: {
      type: String,
      ref: "User",
      required: false,
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
