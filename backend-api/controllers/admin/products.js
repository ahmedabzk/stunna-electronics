import express from "express";
import Product from "../../models/product.model.js";
import errorHandler from "../../errors/error.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};



export const getAll = async (req, res, next) => {
  try {

      const allProducts = await Product.find({})
    return res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};

export const productById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found"));
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProductById = async (req, res, next) => {

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            brand: req.body.brand,
            name: req.body.name,
            description: req.body.description,
            maxQuantity: req.body.maxQuantity,
            colors: req.body.colors,
            images: req.body.images,
            category: req.body.category,
            price: req.body.maxQuantity,
            storage: req.body.sizes,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted successfully");
  } catch (err) {
    next(err);
  }
}