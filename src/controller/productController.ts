import { Request, Response } from "express";
import Product from "../model/Product";
import {
  createProductValidation,
  idParams,
  updateProductValidation,
} from "../middleware/validation";

//@GET api/v1/product
//@description: get all product listed on db
const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      data: {
        products,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"server error"});
  }
};

//@POST api/v1/product
//@description: this end point for creating product
//@validation: admin only can add product
const createProduct = async (req: Request, res: Response) => {
  try {
    const parseBody = createProductValidation.safeParse(req.body);
    if (!parseBody.success) {
      return res
        .status(409)
        .json({ message: "please provide valid product details" });
    }
    const data = parseBody.data;
    const newProduct = await Product.create(data);
    res.status(201).json({ message: "product add successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

//@DELETE api/v1/product/:id
//@parms id (product id)
//@description: this end point for delete product from db
//@validation: admin only can delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const parseParams = idParams.safeParse(req.params);
    if (!parseParams.success) {
      return res.status(400).json({message:"please pass valid body"});
    }
    const data = parseParams.data;
    const existProduct = await Product.findOne({ _id: data.id });
    if (!existProduct) {
      return res.status(404).json({ message: "product not exist" });
    }
    await Product.deleteOne({ _id: data.id });
    res.json({ message: "product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"server error"});
  }
};


//@PUT api/v1/product/:id
//@parms id (product id)
//@description: this end point for update product from db
//@validation: admin only can update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const parseParams = idParams.safeParse(req.params);
    if (!parseParams.success) {
      return res.status(400).json({message:"please pass valid body"});
    }
    const paramsData = parseParams.data;
    const existProduct = await Product.findOne({ _id: paramsData.id });
    if (!existProduct) {
      return res.status(404).json({ message: "product not exist" });
    }
    const parseBody = updateProductValidation.safeParse(req.body);
    if (!parseBody.success) {
      return res.status(409).json({ message: "please provide valid data" });
    }
    const data = parseBody.data;
    data.productName ? (existProduct.productName = data.productName) : null;
    data.description ? (existProduct.description = data.description) : null;
    data.price ? (existProduct.price = data.price) : null;
    data.stock ? (existProduct.stock = data.stock) : null;
    data.tags ? (existProduct.tags = data.tags) : null;
    await existProduct.save();
    res.status(200).json({ message: "product update successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"server error"});
  }
};

export default {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
