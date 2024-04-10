import { Router } from "express";
import orderController from "../controller/orderController";
import { checkLogin } from "../middleware/rollValidation";
const router = Router();
router
  .route("/checkout/create-checkout-session")
  .post(checkLogin(), orderController.createCheckoutSession);

export default router;
