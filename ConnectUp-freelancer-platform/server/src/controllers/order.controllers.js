import Gig from "../models/gigs.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsynHandler } from "../utils/AsynHandler.js";

export const placeOrders = AsynHandler(async (req, res) => {
  const { gigId, freelancerId } = req.body;
  const user = req.user; // authenticated client

  if (!user || user?.role != "client") {
    throw new ApiError("user not authenticated");
  }

  if (!gigId || !freelancerId) {
    throw new ApiError(400, "Missing gigId or freelancerId");
  }

  const gigExists = await Gig.findById(gigId);
  const freelancerExists = await User.findById(freelancerId);
  if (!gigExists || !freelancerExists) {
    throw new ApiError(404, "Gig or Freelancer not found");
  }

  const order = await Order.create({
    gig: gigId,
    client: user._id,
    freelancer: freelancerId,
    status: "inprogress",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Order placed successfully", order));
});

export const getFreelancerOrder = AsynHandler(async (req, res) => {
  const freelancerId = req.user._id;

  const orders = await Order.find({ freelancer: freelancerId })
    .populate("gig")
    .populate("client", "name profileImage")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    throw new ApiError(404, "No orders found for this freelancer");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Freelancer orders fetched", orders));
});

export const getClientOrders = AsynHandler(async (req, res) => {
  const clientId = req.user._id;

  const orders = await Order.find({ client: clientId })
    .populate("gig", "title price")
    .populate("freelancer", "name profileImage")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    throw new ApiError(404, "No orders found for this client");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Client orders fetched", orders));
});

export const markOrderAsCompleted = AsynHandler(async (req, res) => {
  const { orderId } = req.body;
  const user = req.user;

  if (!user || user?.role != "freelancer") {
    throw new ApiError("user not authenticated");
  }

  if (!orderId) {
    throw new ApiError(404, "orderId is required");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      status: "completed",
    },
    { new: true }
  )
    .populate("gig")
    .populate("freelancer")
    .populate("client");

  res.status(200).json({
    success: true,
    message: "Order marked as completed",
    order,
  });
});

export const markOrderAsfailed = AsynHandler(async (req, res) => {
  const { orderId } = req.body;
  const user = req.user;

  if (!user || user?.role != "freelancer") {
    throw new ApiError("user not authenticated");
  }

  if (!orderId) {
    throw new ApiError(404, "orderId is required");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      status: "failed",
    },
    { new: true }
  )
    .populate("gig")
    .populate("freelancer")
    .populate("client");

  res.status(200).json({
    success: true,
    message: "Order marked as failed",
    order,
  });
});
