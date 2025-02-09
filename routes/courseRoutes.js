import express from "express";
import {
  addLectures,
  createCourse,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create course - only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// add lectures, delete course, get course details
router
  .route("/course/:id")
  .get(isAuthenticated, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLectures);

// delete lectures

export default router;
