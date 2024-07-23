import express from "express";
const router = express.Router();
import { getDisciplines, createDiscipline, deleteDiscipline, updateDiscipline } from "../controllers/disciplineController.js";
import { protect } from "../middleware/authMiddleware.js";
router.route("/").get(protect, getDisciplines).post(protect, createDiscipline);
router
    .route("/:id")
    .delete(protect, deleteDiscipline)
    .put(protect, updateDiscipline);
export default router;
