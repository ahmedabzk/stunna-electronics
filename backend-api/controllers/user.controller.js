import bcryptjs from "bcryptjs";

import errorHandler from "../errors/error.js";
import User from "../models/user.model.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};

export const getUserById = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        next(errorHandler(401, "User not found"));
    }

    try {
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUserById = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            if (req.body.password) {
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    imageUrl: req.body.imageUrl
                }
            }, {
                new: true
            });

            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (err) {
            next(err);
        }
    } else {
        return next(errorHandler(401, "User not authenticated"));
    }
}

// export const deleteUser = (req, res, next) => {

// }