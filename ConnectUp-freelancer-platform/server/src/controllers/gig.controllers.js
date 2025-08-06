import cloudinary from "../lib/cloudinary.js";
import Gig from "../models/gigs.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsynHandler } from "../utils/AsynHandler.js";
import fs from "fs";

export const createGig = AsynHandler(async (req, res) => {
  const { title, description, price, deliveryTime, category } = req.body;
  const user = req.user;

  if (!title || !description || !price || !deliveryTime || !category) {
    throw new ApiError(400, "All fields are required");
  }

  if (!user || user.role != "freelancer") {
    throw new ApiError(401, "Unauthorized");
  }

  const filePath = req?.file.path;

  let imageUrl;
  if (filePath) {
    const uploads = await cloudinary.uploader.upload(filePath);
    imageUrl = uploads.secure_url;
  }

  const gig = await Gig.create({
    title,
    description,
    price,
    deliveryTime,
    category,
    createdBy: user._id,
    image: imageUrl,
  });

  if (!gig) {
    throw new ApiError(404, "Internal Server Error");
  }

  if (filePath) {
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "gig created successfully", gig));
});

export const updateGig = AsynHandler(async (req, res) => {
  const { title, description, price, deliveryTime, category } = req.body;
  const { id: gigId } = req.params;
  const user = req.user;

  if (!title || !description || !price || !deliveryTime || !category) {
    throw new ApiError(400, "All fields are required");
  }

  if (!user || user.role != "freelancer") {
    throw new ApiError(401, "Unauthorized");
  }

  const filePath = req?.file.path;

  let imageUrl;
  if (filePath) {
    const uploads = await cloudinary.uploader.upload(filePath);
    imageUrl = uploads.secure_url;
  }

  const gig = await Gig.findByIdAndUpdate(
    gigId,
    {
      title,
      description,
      price,
      deliveryTime,
      category,
      images: imageUrl,
    },
    { new: true }
  );

  if (!gig) {
    throw new ApiError(404, "Gig not found");
  }

  if (filePath) {
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "gig updated successfully", gig));
});

export const deleteGig = AsynHandler(async (req, res) => {
  const { id: gigId } = req.params;

  if (!gigId) {
    throw new ApiError(400, "Gig id is required");
  }

  const user = req.user;

  if (!user || user.role != "freelancer") {
    throw new ApiError(401, "Unauthorized");
  }

  await Gig.findByIdAndDelete(gigId);

  return res
    .status(201)
    .json(new ApiResponse(200, "gig deleted successfully", null));
});

export const markAsCompleted = AsynHandler(async (req, res) => {
  const { id: gigId } = req.params;
  const user = req.user;

  if (!user || user.role != "freelancer") {
    throw new ApiError(401, "Unauthorized");
  }

  const gig = await Gig.findByIdAndUpdate(
    gigId,
    {
      inProgress: false,
    },
    { new: true }
  );

  if (!gig) {
    throw new ApiError(400, "Gig not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "gig marked as completed", gig));
});

export const allGigOfFrelancer = AsynHandler(async (req, res) => {
  const user = req.user;

  if (!user || user.role != "freelancer") {
    throw new ApiError(401, "Unauthorized");
  }

  const gigs = await Gig.find({ createdBy: user._id });

  if (!gigs || gigs.length == 0) {
    throw new ApiError(401, "No gigs found for this freelancer");
  }

  const gigsIds = gigs.map((gig) => gig._id);

  const orders = await Order.find({ gig: { $in: gigsIds } })
    .populate("client")
    .populate("gig");

  return res
    .status(201)
    .json(new ApiResponse(200, "gig fetched successfully", orders));
});

export const allGigOfFrelancerToShow = AsynHandler(async (req, res) => {
  const user = req.user;

  if (!user || user.role != "freelancer") {
    throw new ApiError(401, "Unauthorized");
  }

  const gigs = await Gig.find({ createdBy: user._id });

  if (!gigs || gigs.length == 0) {
    throw new ApiError(401, "No gigs found for this freelancer");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "freelancer gig fetched successfully", gigs));
});

export const allGigOfClient = AsynHandler(async (req, res) => {
  const user = req.user;

  if (!user || user.role != "client") {
    throw new ApiError(401, "Unauthorized");
  }

  const orders = await Order.find({ client: { $in: user?._id } })
    .populate("freelancer")
    .populate("gig");

  return res
    .status(201)
    .json(new ApiResponse(200, "Client order fetched successfully", orders));
});

export const allGigs = AsynHandler(async (req, res) => {
  const gigs = await Gig.find({}).populate({
    path: "createdBy",
    select: "name",
  });

  if (!gigs || gigs.length === 0) {
    throw new ApiError(404, "No gigs found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "All gigs with user details fetched successfully",
        gigs
      )
    );
});

export const getSingleGig = AsynHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id is not defined");
  }

  const gig = await Gig.findById(id).populate({
    path: "createdBy",
    select: "name",
  });

  if (!gig) {
    throw new ApiError(400, "gig not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "gig fetched successfully", gig));
});

export const getAllCategory = AsynHandler(async (req, res) => {
  const datas = await Gig.find({}, "category");
  const category = datas.map((data) => data.category);

  const uniqueCategory = [...new Set(category)];

  return res
    .status(200)
    .json(new ApiResponse(200, "Category fetched", uniqueCategory));
});
