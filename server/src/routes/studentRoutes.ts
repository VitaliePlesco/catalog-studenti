import express from "express";
const router = express.Router();
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";


router.route("/").get(protect, getStudents).post(protect, createStudent);
router
  .route("/:id")
  .get(protect, getStudentById)
  .delete(protect, deleteStudent)
  .put(protect, updateStudent);

export default router;