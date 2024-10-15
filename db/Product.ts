import mongoose from "mongoose";
import { Product } from "../types.ts";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export type ProductModelType = mongoose.Document & Omit<Product, "id">;

export default mongoose.model<ProductModelType>("Product", productSchema);