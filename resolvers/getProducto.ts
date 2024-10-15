import { Request, Response } from "express";
import ProductModel from "../db/Product.ts";

const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id).exec();
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    res.status(200).send({
      name: product.name,
      stock: product.stock,
      description: product.description,
      id: product.id.toString(),
    });
  } catch (error) {
    if (typeof error === "string") {
      res.status(404).send(error.toUpperCase())
    } else if (error instanceof Error) {
      res.status(404).send(error.message)
    }
    return;
  }
};

export default getProduct;
