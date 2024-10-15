import { Request, Response } from "express";
import ProductModel from "../db/Product.ts";

const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, stock, description, price } = req.query;
    if (!name || !stock || !description || !price) {
      res.status(400).send("Name, stock, description, and price are required");
      return;
    }
    const alreadyExists = await ProductModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Producto ya existe");
      return;
    }

    const newProduct = new ProductModel({ name, stock, description, price });
    await newProduct.save();

    res.status(200).send({
      name: newProduct.name,
      stock: newProduct.stock,
      description: newProduct.description,
      id: newProduct.id.toString(),
    });
  } catch (error) {
    if (typeof error === "string") {
      res.status(500).send(error.toUpperCase())
    } else if (error instanceof Error) {
      res.status(500).send(error.message)
    }
    return;
  }
};

export default addProduct;
