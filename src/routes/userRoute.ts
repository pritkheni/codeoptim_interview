import { Router } from "express";
import userController from "../controller/userController";
import { checkGuest, checkLogin, validate } from "../middleware/rollValidation";

const router = Router();
router
  .route("/cart/add/")
  .post(
    checkGuest,
    checkLogin(false),
    validate("user", false),
    userController.addToCart
  );
export default router;
