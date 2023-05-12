import express from "express";
import mongoose from "mongoose";
import data from "./data.js";

import orderRoutes from "./routers/orderRouters.js";
import dotenv from "dotenv";

import orderRouter from "./routers/orderRouters.js";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRouters.js";

// Mongoose server
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Servidor express
const app = express();
/* 
app.use(express.json()); // middleware que permite recibir json en el body de las peticiones 
app.use(express.urlencoded({ extended: true })); // middleware que permite recibir datos de formularios en el body de las peticiones

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter); */

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

app.get("/api/users", (req, res) => {
  res.send(data.users);
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});

// Mongoose server
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });
