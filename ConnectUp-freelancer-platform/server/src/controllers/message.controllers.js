import { io, userSocketMap } from "../../server.js";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsynHandler } from "../utils/AsynHandler.js";

export const getAllUsersForSlideBar = AsynHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "unauthorized user");
  }

  const userId = user?._id;

  const filterUser = await User.find({ _id: { $ne: userId } }).lean();

  const unseenMessages = {};
  const promise = filterUser.map(async (user) => {
    const messages = await Message.find({
      sender: user?._id,
      receiver: userId,
      seen: false,
    });

    if (messages.length > 0) {
      unseenMessages[user?._id] = messages.length;
    }
  });

  await Promise.all(promise);

  res.json(
    new ApiResponse(200, "user fetched for freelancer's Slidebar", {
      users: filterUser,
      unseen: unseenMessages,
    })
  );
});

export const getFreelancerForClient = AsynHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "unauthorized user");
  }

  const userId = user?._id;

  const ordersOfClient = await Order.find({ client: userId }).populate(
    "freelancer"
  );

  const uniqueFreelancersMap = new Map();
  ordersOfClient.forEach((order) => {
    const freelancerId = order.freelancer._id.toString();
    if (!uniqueFreelancersMap.has(freelancerId)) {
      uniqueFreelancersMap.set(freelancerId, order.freelancer);
    }
  });
  const uniqueFreelancers = Array.from(uniqueFreelancersMap.values());

  const unseenMessages = {};
  const promise = uniqueFreelancers.map(async (user) => {
    const messages = await Message.find({
      sender: user?._id,
      receiver: userId,
      seen: false,
    });

    if (messages.length > 0) {
      unseenMessages[user?._id] = messages.length;
    }
  });

  await Promise.all(promise);

  res.status(200).json(
    new ApiResponse(200, "freelancer fetched successfully", {
      uniqueFreelancers,
      unseenMessages,
    })
  );
});

export const getUserMessages = AsynHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "unauthorized user");
  }
  const { id: selectedUserId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: user?._id, receiver: selectedUserId },
      { sender: selectedUserId, receiver: user?._id },
    ],
  });

  await Message.updateMany(
    { sender: selectedUserId, receiver: user?._id },
    { seen: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "messages fetched successfully", messages));
});

export const markMessageAsSeen = AsynHandler(async (req, res) => {
  const { id } = req.params;
  await Message.findByIdAndUpdate(id, { seen: true });

  return res.json(new ApiResponse(200, "msg seen successfully"));
});

export const sendMessages = AsynHandler(async (req, res) => {
  const { text } = req.body;
  const user = req.user;
  const { id: receiverId } = req.params;

  if (!receiverId) {
    return res
      .status(400)
      .json(new ApiResponse(400, "receiver ID are required"));
  }

  let image = null;
  const filePath = req?.file?.path;

  if (filePath) {
    const uploadRes = await cloudinary.uploader.upload(filePath);
    image = uploadRes.secure_url;
  }

  const message = await Message.create({
    sender: user._id,
    receiver: receiverId,
    text,
    image,
  });

  const recieverSocketId = userSocketMap[receiverId];
  if (recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage", message);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", message));
});
