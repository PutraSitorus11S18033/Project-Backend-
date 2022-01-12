import express from "express";
import {
  getWebinarById,
  getWebinar,
  CreateWebinar,
  DeleteWebinar,
  UpdateWebinar,
} from "../controllers/webinarController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getWebinar);
router
  .route("/:id")
  .get(getWebinarById)
  .delete(protect, DeleteWebinar)
  .put(protect, UpdateWebinar);
router.route("/create").post(protect, CreateWebinar);

export default router;
