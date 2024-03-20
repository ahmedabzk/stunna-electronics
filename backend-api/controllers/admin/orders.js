import express from "express";
import Order from "../../models/order.model.js";
import errorHandler from "../../errors/error.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = (req, res, next) => {
  try {
    const order = Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          delivery_status: req.body.delivery_status,
        },
      },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
