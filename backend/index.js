import express from "express";
import mongoose from "mongoose";
import data from "./data.js";

// express server
const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
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
