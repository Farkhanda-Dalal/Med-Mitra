import express from "express";
import { availablePage,checkAvailability,generateBill,stockReport,showReport} from "../Controller/TransactionController.mjs";

const router=express.Router()
router.get("/available/:user",availablePage);
router.post("/available/:user",checkAvailability);
router.post("/generateBill",generateBill);
router.get("/view-report/:user",stockReport);
router.post("/show-report/:user",showReport);

export default router;