import { Router } from "express";
import authController from "../controller/authController";
import { checkGuest } from "../middleware/rollValidation";

const router = Router();
router.route("/guest").get(authController.getRandomId);
router.route("/login").post(checkGuest, authController.loginUser);
export default router;
