import { asyncHandler } from "../utils/asyncHandeler.js";

import { ApiError } from "../utils/ApiError.js";

import { User } from "../models/user.models.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details
  // check for validation - not empty
  // check if user already exists
  // check for images and check for avatar
  // upload in cloudinary
  // save in db by creating object
  // remove password and refresh token field from response which we gonna send back to frontend if we do
  // check for succesful creation
  // return res

  const { username, email, fullname, password } = req.body;

  /*
  if (fullname === "") {
    throw new ApiError(400,"fullname is required")
  }

  we can write like this for every field or there is a advance shortcut 

  */
  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fileds are required");
  }

  /*
  note:
  -> The .some() method is an array method that checks if at least one element in the array satisfies
   the provided condition. It returns true if any element meets the condition, otherwise false.

  -> field?.trim() === "":
         The optional chaining (?.) is used to safely access the trim() method,
         which removes whitespace from both ends of the string. If the field is null or undefined,
         the optional chaining prevents an error by returning undefined. 
         And atlast it checks whether after trimming it's empty or not.

  */

  if (!email.includes("@")) {
    throw new ApiError(400, "email Must contain @ symbol");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already exists ");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.CoverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is needed");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const CoverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400, "Avatar is needed");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    CoverImage: CoverImage?.url,
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )
});

export { registerUser };
