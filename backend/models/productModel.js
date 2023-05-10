import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nameproduct: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  images: { String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdate: { type: Date, required: true },
  idartist: { type: mongoose.Types.ObjectId, ref: "owner", required: true },

  category: {
    type: String,
    required: false,
    required: true,
    enum: [
      "clothing",
      "decoration",
      "painting",
      "photography",
      "jewelry",
      "ceramic",
      "paper",
      "miniatures",
      "soaps and candels",
    ],
  },

  freezeTableName: true,
  typestamps: false,
});

const Product = mongoose.model("product", productSchema);
export default Product;
