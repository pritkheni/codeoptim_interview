import { z } from "zod";
//@description: for check valid login body shap
export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

//@description: for check user give valid product deatail in body
export const createProductValidation = z.object({
  productName: z.string().min(1, { message: "please provide productName" }),
  description: z
    .string()
    .max(600, { message: "description can not be grater then 600 character" }),
  tags: z.string().array(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
});

//@description: for check user give valid params or not
export const idParams = z.object({
  id: z.string().min(1, { message: "please provide valid id parms" }),
});

//@description: for check user give valid body for add to cart
export const cartValidation = z.object({
  productId: z.string(),
  quantity: z.coerce.number(),
});

export const updateProductValidation = createProductValidation.partial();
