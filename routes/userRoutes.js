import express from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/user").get(getAllUsers);

export default router;
