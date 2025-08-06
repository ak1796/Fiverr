import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { AsynHandler } from "../utils/AsynHandler.js";
import jwt from "jsonwebtoken";

export const authUser = AsynHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return new ApiError(401, "unauthorized user");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new ApiError(401, "Invalid token"));
  }

  const user = await User.findById(decodedToken._id);
  if (!user) {
    return next(new ApiError(401, "User not found"));
  }

  req.user = user;
  next();
});
