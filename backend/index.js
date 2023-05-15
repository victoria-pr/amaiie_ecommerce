import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import seedRouter from "./routers/seedRouters.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRouters.js";
import userRouter from "./routers/userRouters.js";// Mongoose server
//import cors from "cors";

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
//app.use(cors());
app.use(express.json()); // middleware que permite recibir json en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // middleware que permite recibir datos de formularios en el body de las peticiones
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);//app.use("/api/orders", orderRouter);app.use((error, req, res, next) => {

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

