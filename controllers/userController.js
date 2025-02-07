import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill details", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exist", 409));
  }

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "temp",
      url: "temp",
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});
