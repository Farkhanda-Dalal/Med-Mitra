import express from "express";
import { signup, signin, register, login} from "../Controller/UserController.mjs";

const router=express.Router();

router.get("/",signup)
router.get("/login",signin)
router.post("/register",register)
router.post("/login",login)

export default router;



