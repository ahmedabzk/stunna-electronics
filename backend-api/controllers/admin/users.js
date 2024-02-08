import User from "../../models/user.model.js";
import errorHandler from "../../errors/error.js";


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // const { password, ...rest } = users._doc;
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