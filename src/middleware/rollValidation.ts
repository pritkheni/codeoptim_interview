import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import Role from "../model/Role";
import User from "../model/User";
declare global {
  namespace Express {
    interface Request {
      userId: string;
      guestId: string;
    }
  }
}
//@description: this middleware check if user login as guest if login then set guest id
export const checkGuest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const guestToken = req.cookies["guestToken"] as string;
    if (guestToken) {
      req.guestId = guestToken;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "please provide guest cokies" });
  }
};

//@parms
// strict: is it strict check or not
//@description: this middleware check if user is login or not if strict value set to true then user can not permit to procide fruther
export const checkLogin = (strict: boolean = true) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["token"] as string;
      if (!token || !token.startsWith("Bearer")) {
        if (strict) {
          return res
            .status(401)
            .json({ message: "plese provide authorization token" });
        }
        req.userId = "";
        console.log(`user id null`);
        next();
        return;
      }
      const jwtToken = token.split(" ")[1];
      const decodedToken = verify(
        jwtToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      const id = decodedToken.userId as string;
      const user = await User.findOne({ _id: id });
      if (!user) {
        if (strict) {
          return res
            .status(401)
            .json({ message: "please login with valid user" });
        }
        req.userId = "";
        next();
        return;
      }
      req.userId = decodedToken.userId as string;
      next();
    } catch (err) {
      console.log(err);
      if (strict) {
        return res
          .status(401)
          .json({ message: "please provide authetication token" });
      }
      next();
    }
  };
};

//@parms
// role: for which role validation should be done,
// strict: is it strict check or not
//@description: this middleware if for check is this valide role or not ,to authorize user.
export const validate = (role: string, strict: boolean = true) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.userId);
      if (!req.userId) {
        if (strict) {
          return res
            .status(401)
            .json({ message: "please provide credetial for login" });
        }
        next();
        return;
      }
      const roleLookUp = await Role.findOne({ roleName: role });
      if (!roleLookUp) {
        return res
          .status(409)
          .json({ message: "there is no role for to look up" });
      }
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        if (strict) {
          return res.status(401).json({ message: "user not found" });
        }
        req.userId = "";
        next();
        return;
      }
      const userRole = user.role;
      if (userRole !== roleLookUp.roleCode) {
        if (strict) {
          return res
            .status(401)
            .json({ message: `only ${role} procide this operation` });
        }
        req.userId = "";
        next();
      }
      next();
    } catch (err) {
      console.log(err);
      if (strict) {
        return res.status(500).json({ message: "server error" });
      }
      req.userId = "";
      next();
    }
  };
};
