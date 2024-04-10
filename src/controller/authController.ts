import { Request, Response } from "express";
import { loginValidation } from "../middleware/validation";
import User from "../model/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { updateTempCart } from "../utils/cartUtils";



// @POST /api/v1/auth/login
// @description: this end point is for user to login user get cookie with jwt token which expire in 1day 
const loginUser = async (req: Request, res: Response) => {
  try {
    const parseBody = loginValidation.safeParse(req.body);
    if (!parseBody.success) {
      return res.status(409).json({ message: "please provide valid data" });
    }
    const data = parseBody.data;
    const findedUser = await User.findOne({
      $or: [{ username: data.email }, { email: data.email }],
    });
    if (!findedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    const passCheck = await compare(data.password, findedUser.password);
    if (!passCheck) {
      return res.status(401).json({ message: "please provide valid password" });
    }
    const token = sign(
      { userId: findedUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", `Bearer ${token}`, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    if (req.guestId) {
      updateTempCart(req.guestId, findedUser._id.toString());
    }
    res.status(200).json({ message: "login succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"server error"});
  }
};

//@GET /api/v1/auth/guest
//@description:this end point is for user to login as guest when user visit website please call this end point and they get guest id whith which they can add product in cart
const getRandomId = async (req: Request, res: Response) => {
  let token = uuidv4();
  res.cookie("guestToken", token);
  res.status(200).json({ message: "login as guest user successfully" });
};

export default {
  loginUser,
  getRandomId,
};
