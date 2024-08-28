import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandeler.js";

import jwt from "jsonwebtoken";

import { User } from "../models/user.models.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorzation")?.replace("Bearer ", "");
  
    if (!token) {
      throw new ApiError(401, "Unathorized Request");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
  
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
  
    req.user = user;
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid access token");
    
  }
});
