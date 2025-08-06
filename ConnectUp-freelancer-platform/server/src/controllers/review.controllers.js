import Gig from "../models/gigs.model.js";
import Review from "../models/review.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsynHandler } from "../utils/AsynHandler.js";

export const createReview = AsynHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { id: gigId } = req.params;
  const user = req.user;

  if (!user || user.role != "client") {
    throw new ApiError(401, "anauthorized user");
  }

  if (!gigId) {
    throw new ApiError(401, "Gig not found with this Id");
  }

  if (!rating || !comment) {
    throw new ApiError(400, "Rating and comment are required");
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be a number between 1 and 5");
  }

  const review = await Review.create({
    client: user?._id,
    gig: gigId,
    rating,
    comment,
  });

  if (!review) {
    throw new ApiError(400, "Internal Server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "review created successfully"), review);
});

export const fetchedReviewOfGig = AsynHandler(async (req, res) => {
  const { id: gigId } = req.params;

  if (!gigId) {
    throw new ApiError(400, "Gig ID is required");
  }

  const reviews = await Review.find({ gig: gigId })
    .populate("gig")
    .populate("client");

  if (!reviews || reviews.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No reviews found for this gig", []));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Reviews fetched successfully", reviews));
});

export const getFreelancerAvgRating = AsynHandler(async (req, res) => {
  const user = req.user;

  if (!user || user?.role != "freelancer") {
    throw new ApiResponse(401, "not authorized");
  }

  const gigs = await Gig.find({ createdBy: user?._id }).select("_id");
  const gigsId = gigs.map((gig) => gig?._id);

  const reviews = await Review.find({ gig: { $in: gigsId } });

  if (reviews.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, "Reviews fetched", {
        averageRating: 0,
        totalReviews: 0,
      })
    );
  }

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = total / reviews.length;

  return res.status(200).json(
    new ApiResponse(200, "Reviews fetched", {
      averageRating: parseFloat(avgRating.toFixed(2)),
      totalReviews: reviews.length,
    })
  );
});
