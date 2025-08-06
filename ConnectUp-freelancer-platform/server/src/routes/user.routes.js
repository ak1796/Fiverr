import express from "express";
import {
  clientInformations,
  freelancerInformations,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { authUser } from "../middlewares/authUser.js";
import upload from "../lib/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-details", authUser, getUserDetails);
userRouter.get("/logout", authUser, logoutUser);
userRouter.post(
  "/freelancer/add-info",
  upload.single("image"),
  authUser,
  freelancerInformations
);

userRouter.post(
  "/client/add-info",
  upload.single("image"),
  authUser,
  clientInformations
);


export default userRouter;
clientInformations