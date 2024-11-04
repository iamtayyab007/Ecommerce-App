import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const decodeToken = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decodeToken;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role === 0) {
      res.status(400).send({
        message: "unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.send({ error });
  }
};

export { requireSignIn, isAdmin };
