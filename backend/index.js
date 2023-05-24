import express from "express";
import mongoose from "mongoose";
import seedRouter from "./routers/seedRouters.js";
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

app.use(express.json()); // middleware que permite recibir json en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // middleware que permite recibir datos de formularios en el body de las peticiones
app.use(express.static("publicback")); // middleware que permite leer archivos estáticos (imágenes, css, js, etc) de la carpeta publicback

// Rutas
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// captura los errores de las rutas anteriores
app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

//inicio de la aplicación
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});