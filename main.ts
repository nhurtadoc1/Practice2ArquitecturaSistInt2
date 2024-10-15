// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import addProduct from "./resolvers/addProduct.ts";
import getProducto from "./resolvers/getProducto.ts";
import getProductos from "./resolvers/getProductos.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app.post("/addProduct", addProduct);
app.get("/producto/:id", getProducto);
app.get("/productos", getProductos);
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
