import express from "express";
import Product from "../models/product.model.js";
import errorHandler from "../errors/error.js";

export const getIphoneProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ brand: "iphone" });
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getSamsungProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ brand: "samsung" });
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getAllPhones = async (req, res, next) => {
  try {
    const product = await Product.find({ category: "phones" });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getHpLaptops = async (req, res, next) => {
  try {
    const product = await Product.find({ brand: "hp" });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getMacbookLaptops = async (req, res, next) => {
  try {
    const product = await Product.find({ brand: "macbook" });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getAllLaptops = async (req, res, next) => {
  try {
    const product = await Product.find({ category: "lapops" });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found"));
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductsByBrandWithLimit = async (req, res, next) => {
  try {
    const limit = req.query.limit || 5;
    const brand = req.query.brand;

    const allProducts = await Product.find({brand: brand}).limit(limit);

    return res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const allProducts = await Product.find({}).sort({_id: 1});
    
    // Slice the products array based on the indexes
    const paginatedProducts = allProducts.slice(startIndex, endIndex);
  

    // Calculate the total number of pages
    const totalPages = Math.ceil(allProducts.length / pageSize);

    // Send the paginated products and total pages as the API response
      return res.json({ products: paginatedProducts, totalPages });
  } catch (err) {
    next(err);
  }
};

export const getSearchProducts = async (req, res, next) => {
  try {

    const searchTerm =req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
    }).sort({ [sort]: order });
      return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
