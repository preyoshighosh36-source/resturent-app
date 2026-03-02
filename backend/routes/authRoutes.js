import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
  logoutUser,
  getProfile,
  isAuth,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getProfile);
router.get("/is-auth", protect, isAuth);


router.post("/admin/login", adminLogin); // <-- now exists

export default router;