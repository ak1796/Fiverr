import cloudinary from "../lib/cloudinary.js";
import { sendEmail } from "../lib/nodemailer.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsynHandler } from "../utils/AsynHandler.js";

export const registerUser = AsynHandler(async (req, res) => {
  const { name, email, password, role, skills } = req.body;

  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All Fields are required");
  }

  const allowedRoles = ["client", "freelancer"];
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid user role");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  let user = null;
  const normalizedEmail = email.toLowerCase();

  if (role == "freelancer") {
    if (!Array.isArray(skills) || skills.length === 0) {
      throw new ApiError(400, "Skills are required");
    }
    user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role,
      skills,
    });
  } else {
    user = await User.create({ name, email: normalizedEmail, password, role });
  }

  if (!user) {
    throw new ApiError(400, "Internal Server error");
  }

  const token = await user.generateAuthToken();

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  await sendEmail(
    user.email,
    "Welcome to ConnectUp!",
    `
    Hi ${user.name},
    Welcome to ConnectUp — your gateway to freelancing freedom!
    We're thrilled to have you join our community of talented professionals and clients looking to collaborate.
    Start exploring gigs, connect with freelancers, or post your own projects now!
    
    Cheers,The ConnectUp Team
  `
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "user registered successfully", user));
});

export const loginUser = AsynHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError("All Fields are required");
  }

  const user = await User.findOne({ email, role });
  if (!user) {
    throw new ApiError("Inavalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError("Inavalid credentials");
  }

  const token = await user.generateAuthToken();

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "user login successfully", user));
});

export const getUserDetails = AsynHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "user is not authenticated");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully", user));
});

export const logoutUser = AsynHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export const freelancerInformations = AsynHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "All fields are required");
  }

  const { bio, experience } = req.body;

  if (!bio || !experience) {
    throw new ApiError(400, "All fields are required");
  }
  const filePath = req.file?.path;

  let imageUrl = null;

  if (filePath) {
    const uploadRes = await cloudinary.uploader.upload(filePath);
    imageUrl = uploadRes.secure_url;
  }

  const newUser = await User.findByIdAndUpdate(
    user._id,
    {
      avatar: imageUrl,
      bio,
      experience,
    },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Freelancer information updated successfully",
        newUser
      )
    );
});

export const clientInformations = AsynHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "All fields are required");
  }

  const { bio } = req.body;

  if (!bio) {
    throw new ApiError(400, "All fields are required");
  }
  const filePath = req.file?.path;

  let imageUrl = null;

  if (filePath) {
    const uploadRes = await cloudinary.uploader.upload(filePath);
    imageUrl = uploadRes.secure_url;
  }

  const newUser = await User.findByIdAndUpdate(
    user._id,
    {
      avatar: imageUrl,
      bio,
    },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "client information updated successfully", newUser)
    );
});
