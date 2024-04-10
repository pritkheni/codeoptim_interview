import { InferSchemaType, Schema, Types, model } from "mongoose";
const cartItemShema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

export type CartItems = InferSchemaType<typeof cartItemShema>;
const cartItemListSchema = new Schema({
  cartId: { type: String, required: true },
  products: [cartItemShema],
});

const CartItemList = model("cartItems", cartItemListSchema);
export default CartItemList;