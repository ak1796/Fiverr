import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  getAllUsersForSlideBar,
  getFreelancerForClient,
  getUserMessages,
  markMessageAsSeen,
  sendMessages,
} from "../controllers/message.controllers.js";
import upload from "../lib/multer.js";

const messageRouter = express.Router();

messageRouter.get("/get-all-user", authUser, getAllUsersForSlideBar);
messageRouter.get("/get-freelaner", authUser, getFreelancerForClient);
messageRouter.get("/get-message/:id", authUser, getUserMessages);
messageRouter.put("/mark/:id", authUser, markMessageAsSeen);
messageRouter.post("/send/:id", upload.single("image") , authUser, sendMessages);

export default messageRouter;
