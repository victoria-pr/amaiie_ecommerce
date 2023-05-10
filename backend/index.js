import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import orderRoutes from './routers/orderRouters.js';

// Servidor express
const app = express();
const puerto = process.env.PUERTO || 3000;
const mongoURI = process.env.MONGODB_URI;

app.get("/api/productos", (req, res) => {
  res.send(data.productos);
});

app.use(orderRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

app.listen(puerto, () => {
  console.log(`El servidor está funcionando en el puerto ${puerto}`);
});

// Servidor Mongoose
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectarse a MongoDB:", err.message);
  });
