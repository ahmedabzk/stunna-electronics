import express from "express";

import User from "../models/user.model.js";
import errorHandler from "../errors/error.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  // check if email already exists in the database
  const userEmail = await User.findOne({ email: email });
  if (userEmail) {
    return next(errorHandler(500, "Email already exists"));
  }

  // hash the password
  const hashedPass = bcryptjs.hashSync(password, 10);
  const newUser = await User({ name, email, password: hashedPass });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      next(errorHandler(404, "User not found"));
    }

    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (!checkPassword) {
      next(errorHandler(404, "email or password is incorrect"));
    }

      const token = JWT.sign({ id: user._id }, process.env.SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
