import {Customer}  from "./../models/signUpModel"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");


import { Request,Response } from "express";

const signToken = (id:any) => {
  return jwt.sign({ id }, "my-ultra-secure-and-ultra-long-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};





exports.signup = async (req:Request, res:Response, next:any) => {
  try {
    const newUser = await Customer.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "Success",
      
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log("🚀 ~ file: authController.ts:40 ~ exports.signup= ~ err:", err)
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req:Request, res:Response, next:any) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      throw new Error("Email or Password doesn't exist");
    }
    const user:any = await Customer.findOne({ name }).select("+password");
    const correct = await bcrypt.compare(password, user.password);
    if (!user || !correct) {
      throw new Error("Incorrect email or password!!");
    }
    const token = signToken(user._id);
    localStorage.setItem("token", token);
    res.status(200).json({
      status: "Success",
      token,
      data: user,
    });
  } catch (err:any) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
