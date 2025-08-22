import express from "express";
import {
  getTransfers,
  addTransfer,
  updateTransfer,
  deleteTransfer
} from "../controllers/transferController.js";

const router = express.Router();

router.get("/", getTransfers);
router.post("/", addTransfer);
router.put("/:id", updateTransfer);
router.delete("/:id", deleteTransfer);

export default router;
