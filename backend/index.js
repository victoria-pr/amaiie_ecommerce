import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouters.js";

// express server
const app = express();
app.use(express.json()); // middleware que permite recibir json en el body de las peticiones 
app.use(express.urlencoded({ extended: true })); // middleware que permite recibir datos de formularios en el body de las peticiones
app.use("/api/users", userRouter);

app.get("/api/products", (req, res) => {
  res.send(data.products);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});


// Mongoose server
 mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected on db");
  })
  .catch((error) => {
    console.log(error.message);

  }); 

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
}); 

  });
 

