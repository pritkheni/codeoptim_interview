import { Response, Request } from "express";
import { cartValidation } from "../middleware/validation";
import CartItemList from "../model/CartProductList";

//@POST api/v1/user/cart/add
//@Description: this end point add product to cart of given user id if it's not avialble user need to get guest id first from guest route if user nither have guest id nore login into then add to cart rejected
//@validation: either login or have guest id
const addToCart = async (req: Request, res: Response) => {
  try {
    const parseParams = cartValidation.safeParse(req.body);
    if (!parseParams.success) {
      return res.status(401).json({ message: "please provide valid body" });
    }
    const data = parseParams.data;
    let cartId;
    console.log(req.guestId);
    console.log(req.userId);
    if (req.guestId) cartId = req.guestId;
    if (req.userId) cartId = req.userId;
    if (!cartId)
      return res.status(400).json({ message: "please login as guest or user" });
    let cartItemList = await CartItemList.findOne({ cartId });
    if (!cartItemList) {
      cartItemList = new CartItemList({
        cartId,
        products: [],
      });
    }

    const index = cartItemList.products.findIndex(
      (item) => item.product.toString() === data.productId
    );
    if (index !== -1) {
      cartItemList.products[index].quantity += data.quantity;
    } else {
      cartItemList.products.push({
        quantity: data.quantity,
        product: data.productId,
      });
    }
    await cartItemList.save();
    res.status(201).json({ message: "item add successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"server error"});
  }
};

export default {
  addToCart,
};
