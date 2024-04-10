import CartItemList from "../model/CartProductList";

//@params
// cartId:for which cart id to look up in db
// userId:for which userid should cart item list assign to
//@description: this function take two param cartid and userid this funcation look up for cartid in to cart item list if it find that cart id then it update cartid of cart item to user id
export const updateTempCart = async (cartId: string, userId: string) => {
  try {
    const cartItem = await CartItemList.findOne({ cartId: cartId });
    if (cartItem) {
      cartItem.cartId = userId;
      await cartItem.save();
    }
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong while updating cart");
  }
};
