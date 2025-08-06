import express from "express";
import upload from "../lib/multer.js";
import { authUser } from "../middlewares/authUser.js";
import {
  allGigOfClient,
  allGigOfFrelancer,
  allGigOfFrelancerToShow,
  allGigs,
  createGig,
  deleteGig,
  getAllCategory,
  getSingleGig,
  markAsCompleted,
  updateGig,
} from "../controllers/gig.controllers.js";

const gigRouter = express.Router();

gigRouter.post("/create", upload.single("image"), authUser, createGig);
gigRouter.post("/update/:id", upload.single("image"), authUser, updateGig);
gigRouter.delete("/delete/:id", authUser, deleteGig);
gigRouter.get("/freelancer/all-gigs", authUser, allGigOfFrelancer);
gigRouter.get("/client/all-gigs", authUser, allGigOfClient);
gigRouter.get("/all", allGigs);
gigRouter.get("/one-gig/:id", getSingleGig);
gigRouter.post("/completed/:id", authUser, markAsCompleted);
getAllCategory;
gigRouter.get("/category", getAllCategory);
gigRouter.get("/all-gigs-to-show", authUser, allGigOfFrelancerToShow);

export default gigRouter;
