import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
});


const Product = model("Product", productSchema);
export default Product;
