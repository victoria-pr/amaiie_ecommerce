import mongoose from "mongoose"; //Importamos la librería mongoose para el esquema de la base de datos de los productos

const productSchema = new mongoose.Schema(
  //Objeto con los elementos de los productos
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
    //para que mongoose cree la fecha actualizada de creación y actualización de datos
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
