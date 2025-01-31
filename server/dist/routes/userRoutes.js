import express from "express";
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, refreshToken } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
router.post("/", registerUser);
router.post("/auth", authUser);
router.get("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile);
export default router;
