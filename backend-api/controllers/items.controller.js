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
        const items = await Item.find({ featured: req.query.feature });
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
}