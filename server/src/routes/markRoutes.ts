import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { createMark, deleteMark, getStudentMarksByDiscipline, updateMark } from "../controllers/markController.js";

router.route("/").post(protect, createMark);
router.route("/:studentId/discipline/:disciplineId").get(protect, getStudentMarksByDiscipline);
router
  .route("/:id")
  .delete(protect, deleteMark)
  .put(protect, updateMark);

export default router;