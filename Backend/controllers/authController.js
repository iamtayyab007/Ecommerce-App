import { token } from "morgan";
import { comparePassword, hashedPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // validations
    if (!name) {
      return res.status(400).send({ error: "name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "password is required" });
    }

    if (!phone) {
      return res.status(400).send({ error: "Phone number is required" });
    }
    if (!address) {
      return res.status(400).send({ error: "address is required" });
    }

    // existing user

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "user already registered, Please login",
      });
    }

    // register user
    const hashPassword = await hashedPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      password: hashPassword,
      phone,
      address,
    }).save();
    return res
      .status(200)
      .send(
        { success: true, message: "user registered successfully", user },
        user
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in registration", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validations
    if (!email || !password) {
      return res.status(400).send({
        error: "email and password required.",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ error: "The email address does'not exists" });
    }
    // if the user exists, now compare the hash password
    const thenPasswordMatch = comparePassword(password, user.password);
    if (!thenPasswordMatch) {
      return res.status(400).send({ error: "Invalid password" });
    }
    // JWT token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error during login.",
      error,
    });
  }
};

const testController = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "verfied token successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

export { registerController, loginController, testController };
