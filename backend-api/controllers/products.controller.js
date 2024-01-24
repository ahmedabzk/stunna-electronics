import express from 'express';
import Product from '../models/product.model.js';
import errorHandler from '../errors/error.js';


export const getFeaturedProducts = async (req, res, next) => {

    try {
        const products = await Product.find({ featured: true });
        return res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

export const getRecommendedProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ recommended: true });
        return res.status(200).json(products);
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