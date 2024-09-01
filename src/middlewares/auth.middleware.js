import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandeler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization Header:", req.header("Authorization"));

    // Adjusted to handle both cookies and raw token in the header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization"); // Extract directly if it's not prefixed with "Bearer "

    // console.log("Extracted Token:", token);

    if (!token || typeof token !== "string") {
      throw new ApiError(401, "Unauthorized Request: No valid token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Error in JWT verification:", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
