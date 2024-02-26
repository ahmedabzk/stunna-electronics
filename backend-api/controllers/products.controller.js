import express from 'express';
import Product from '../models/product.model.js';
import errorHandler from '../errors/error.js';


export const getIphoneProducts = async (req, res, next) => {

    try {
        const products = await Product.find({ brand: "iphone"});
        return res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

export const getSamsungProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ brand: "samsung"});
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
    const product = await Product.find({ brand: "hp"});
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getMacbookLaptops = async (req, res, next) => {
  try {
    const product = await Product.find({ brand: "macbook"});
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



export const getAllProducts = async (req, res, next) => {
    try {
        const limit = req.query.limit || 2;
        const page = req.query.page || 0;

         const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";
        
        const allProducts = await Product.find({}).sort({[sort]: order}).limit(limit).skip(page);
        
        return res.status(200).json(allProducts);
    } catch (err) {
        next(err);
    }
}