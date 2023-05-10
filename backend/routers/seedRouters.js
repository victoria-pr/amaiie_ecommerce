import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
//seedRouter es un objeto
const seedRouter = express.Router();


//Función asíncrona

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  //Para crear nuevos productos
  const createdProducts = await Product.insertMany(data.products);
  
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
