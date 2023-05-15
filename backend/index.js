import express from "express";
import mongoose from "mongoose";
import seedRouter from "./routers/seedRouters.js";
import data from "./data.js";
<<<<<<< HEAD
import seedRouter from "./routers/seedRouters.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRouters.js";
import userRouter from "./routers/userRouters.js";// Mongoose server
//import cors from "cors";

=======
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouters.js";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRouters.js";
import path from "path";
import orderRoutes from "./routers/orderRouters.js";

// Mongoose server
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
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

// Servidor express
const app = express();

app.use(express.json()); // middleware que permite recibir json en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // middleware que permite recibir datos de formularios en el body de las peticiones

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

/* const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
); */

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

=======
  console.log(`server at http://localhost:${port}`);
});
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
