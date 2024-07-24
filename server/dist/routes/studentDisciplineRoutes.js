import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { createStudentDiscipline, deleteStudentDiscipline, getStudentDisciplines } from "../controllers/studentDisciplineController.js";
router.route("/").post(protect, createStudentDiscipline);
router.route("/:studentId").get(protect, getStudentDisciplines);
router.route("/:studentId/discipline/:disciplineId").delete(protect, deleteStudentDiscipline);
export default router;
