import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  const file = req.file;

  const fileUri = getDataUri(file);

  const uploadResult = await cloudinary.uploader
    .upload(fileUri.content)
    .catch((error) => {
      console.log(error);
    });

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now",
  });
});

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course Not Found", 404));
  }

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

export const addLectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const course = await Course.findById(id);

  const file = req.file;

  if (!course) {
    return next(new ErrorHandler("Course Not found", 404));
  }

  const fileUri = getDataUri(file);

  const uploadResult = await cloudinary.uploader
    .upload(fileUri.content, {
      resource_type: "video",
    })
    .catch((error) => {
      console.log(error);
    });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});
