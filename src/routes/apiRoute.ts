import { Router } from "express";
import authRoute from "./authRoute";
import produtRoute from "./produtRoute";
import userRoute from "./userRoute";
import orderRoute from "./orderRoute";

const router = Router();
router.use("/v1/auth", authRoute);
router.use("/v1/user", userRoute);
router.use("/v1/product", produtRoute);
router.use("/v1/order", orderRoute);
export default router;
