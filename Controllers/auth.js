import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pass, salt);

    const newUser = new User({
      ...req.body,
      pass: hash,
    });

    await newUser.save();
    res.status(200).json({message:"ok"});
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    console.log(user);
    if (!user) return next(createError(400, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.pass
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("user", token)
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = async(req,res,next)=>{
  try {
    res.clearCookie('access_token');
    res.status(200).json({"message":"User log out successfully"});
  } catch (error) {
    next(error);
  }
}