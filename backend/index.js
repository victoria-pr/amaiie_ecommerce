import express from "express";
import mongoose from "mongoose";
import data from "./data.js";

// express server
const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});


// Mongoose server
/* mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected on db");
  })
  .catch((error) => {
    console.log(error.message);

  });
 */
