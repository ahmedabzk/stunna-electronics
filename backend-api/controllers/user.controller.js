import bcryptjs from "bcryptjs";

import errorHandler from "../errors/error.js";
import User from "../models/user.model.js"





export const updateUserById = async (req, res, next) => {
    console.log(req.params);
    if (req.user.id === req.params.id) {
        try {
            if (req.body.password) {
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    imageUrl: req.body.imageUrl
                }
                },
                {
                new: true
                },
            );

            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (err) {
            next(err);
        }
    } else {
        return next(errorHandler(401, "User not authenticated"));
    }
}

