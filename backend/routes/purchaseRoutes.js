import express from "express";
import {
  getPurchases,
  addPurchase,
  updatePurchase,
  deletePurchase
} from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/", getPurchases);
router.post("/", addPurchase);
router.put("/:id", updatePurchase);     // <-- update route
router.delete("/:id", deletePurchase);  // <-- delete route

export default router;
