import { Request, Response } from "express";
import Stripe from "stripe";
import CartItemList from "../model/CartProductList";
const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONT_END_URL as string;

//@POST /api/v1/order/checkout/create-create-checkout-session
//@Description: this end point for create stripe checkout url to purches items
//@validation: user must be login to use this route
const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const cartItem = await CartItemList.findOne({
      cartId: req.userId,
    }).populate("products.product");
    if (!cartItem) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (cartItem.products.length === 0) {
      return res.status(404).json({ message: "product can not be empty" });
    }
    const populatedCartItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartItem.products.map((item: any) => {
        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
          price_data: {
            currency: "INR",
            unit_amount: item.product.price,
            product_data: {
              name: item.product.productName,
            },
          },
          quantity: item.quantity,
        };
        return line_item;
      });
    const session = await STRIPE.checkout.sessions.create({
      line_items: populatedCartItems,
      mode: "payment",
      metadata: {
        orderId: "TEMP_ORDER_ID",//we should create one order before this and assign that order id to that 
      },
      success_url: `${FRONTEND_URL}/order-status?scuccess=true`,
      cancel_url: `${FRONTEND_URL}/home`,
    });

    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe error" });
    }

    console.log(populatedCartItems);
    res.json({ url: session.url });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.raw.message });
  }
};
export default {
  createCheckoutSession,
};
