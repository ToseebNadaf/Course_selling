import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create course - only admin
router.route("/createcourse").post(createCourse);

// add lectures, delete course, get course details

// delete lectures 

export default router;
