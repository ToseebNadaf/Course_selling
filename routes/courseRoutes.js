import express from "express";
import { createCourse, getAllCourses } from "../controllers/courseController.js";

const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/createcourses").post(createCourse);

export default router;
