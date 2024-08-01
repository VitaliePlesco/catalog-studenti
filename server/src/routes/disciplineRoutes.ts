import express from "express";
const router = express.Router();
import { getDisciplines, createDiscipline, deleteDiscipline, updateDiscipline } from "../controllers/disciplineController.js";
import { protect } from "../middleware/authMiddleware.js";


router.route("/").post(protect, createDiscipline);
router.route("/:userId").get(protect, getDisciplines);
router
  .route("/discipline/:id")
  .delete(protect, deleteDiscipline)
  .put(protect, updateDiscipline);

export default router;



