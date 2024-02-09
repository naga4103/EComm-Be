const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken");
import { Request,Response } from "express";

exports.jwtCheck = async (req:Request, res:Response, next:any) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    console.log("jwtSecret in middleware", jwtSecret);

    const token = req.headers.authorization;
    console.log("token", token);
    const decode = jwt.verify(token, jwtSecret);
    if (!decode) {
      throw new Error("Not Authorized, Token Failed");
    }
    next();

 } catch (err:any) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
