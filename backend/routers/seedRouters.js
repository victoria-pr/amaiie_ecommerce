import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";

/* 
const seedRouter = express.Router();
seedRouter.get("/", async (req, res) => {
  await Product.deleteOne({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

await User.remove({});
const createdUsers = await User.insertMany(data.users);
res.send({ createdProducts, createdUsers });

export default seedRouter;
 */

//seedRouter es un objeto
const seedRouter = express.Router();

//Función asíncrona con la ruta

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  //Para crear nuevos productos desde data.js
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });

  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
