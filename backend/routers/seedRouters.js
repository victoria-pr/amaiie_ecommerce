import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
//Ruta realacionada con la inicialización de datos de prueba en la base de datos
const seedRouter = express.Router();
//Definimos una ruta GET para eliminar todos los productos existente en la base de datos
seedRouter.get("/", async (req, res) => {
  await Product.deleteOne({});
  //Insertamos los datos de prueba de productos
  const createdProducts = await Product.insertMany(data.products);
  //Lo mismo con usuarios
  await User.deleteOne({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
