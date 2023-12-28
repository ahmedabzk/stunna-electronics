import express from 'express';
import Item from '../models/item.model.js';
import errorHandler from '../errors/error.js';


export const createItem = async (req, res, next) => {
    try {
        const item = await Item.create(req.body);
        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
}

export const getFeaturedItems = async (req, res, next) => {

    try {
        // const feature = true;
        const items = await Item.find({ featured: true});
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};

export const getRecommended = async (req, res, next) => {
    try {
        const items = await Item.find({ recommended: true });
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};

export const getItemById = async (req, res, next) => {
  
    try {
          const item = await Item.findById(req.params.id);
          if (!item) return next(errorHandler(404, "Item not found"));
        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
}