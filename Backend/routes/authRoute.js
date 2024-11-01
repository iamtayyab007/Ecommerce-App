import express from "express";
import { registerController } from "../controllers/authController.js";

// router object

const router = express.Router();

// routing register Method Post
router.post("/register", registerController);

export default router;
