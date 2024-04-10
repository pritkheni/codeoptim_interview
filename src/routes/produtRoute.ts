import { Router } from "express";
import productController from "../controller/productController";
import { checkLogin, validate } from "../middleware/rollValidation";

const router = Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(checkLogin(), validate("admin"), productController.createProduct);

router
  .route("/:id")
  .delete(checkLogin(), validate("admin"), productController.deleteProduct)
  .put(checkLogin(), validate("admin"), productController.updateProduct);

export default router;
