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