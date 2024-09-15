import express from "express";
import { addPage,addStock,viewPage, expPage,expStock } from "../Controller/InventoryController.mjs";

const router=express.Router();

router.get("/add-stock/:user",addPage);
router.post("/add-stock",addStock);
router.get("/view-stock/:user",viewPage);
router.post("/view-stock");
router.get("/exp-stock/:user",expPage);
router.get("/exp-stock-bad/:user",expStock);
router.get("/exp-stock-good/:user",expStock);
router.get("/exp-stock-avg/:user",expStock);

export default router;