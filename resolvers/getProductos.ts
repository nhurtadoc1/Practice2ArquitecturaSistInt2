import { Request, Response } from "express";
import ProductModel from "../db/Product.ts";

const getProducts = async (req: Request, res: Response) => {
  try {
    const { minPrecio, maxPrecio } = req.query;
    const products = await ProductModel.find();
    const minPrecioFinal = !minPrecio ? 0 : minPrecio;
    const maxPrecioFinal = !maxPrecio ? 2147483647 : maxPrecio;
    res.status(200).send(
      products.map((product) => ({
        name: product.name,
        stock: product.stock,
        description: product.description,
        price: product.price,
        id: product.id.toString(),
      })).filter((product) => product.price >= minPrecioFinal && product.price <= maxPrecioFinal)
    );
  } catch (error) {
    res.status(500).json({
      message: "Algo ha pasado: " + error,
    });
  }
};

export default getProducts;
