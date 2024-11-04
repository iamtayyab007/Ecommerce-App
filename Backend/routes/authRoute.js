import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// router object

const router = express.Router();

// routing register & login Method Post
router.post("/register", registerController);
router.post("/login", loginController);
// auth test Api
router.post("/test", requireSignIn, isAdmin, testController);
export default router;
