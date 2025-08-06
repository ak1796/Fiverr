import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { createReview, fetchedReviewOfGig, getFreelancerAvgRating } from "../controllers/review.controllers.js";

const reviewRouter = express.Router();

reviewRouter.post("/create/:id", authUser, createReview);
reviewRouter.get("/all-review/:id", authUser, fetchedReviewOfGig);
reviewRouter.get("/get-avg", authUser, getFreelancerAvgRating);

export default reviewRouter;
