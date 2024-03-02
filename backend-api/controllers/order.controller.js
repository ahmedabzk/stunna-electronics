import express from 'express';
import errorHandler from '../errors/error.js';
import Order from '../models/order.model.js';

export const getYourOrders = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const order = await Order.find({userId: req.params.id});
            res.status(200).json(order);
        } catch (err) {
            next(err);
        }
    } else {
        return next(errorHandler(401, "login to view your orders"));
    }
    
}