import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  gig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gig",
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
