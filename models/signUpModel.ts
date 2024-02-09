// const mongoose = require("mongoose");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
import mongoose from "mongoose";
import validator from "validator";

import bcrypt from "bcryptjs";

interface ISignUp {
  name: string;
  email: string;
  mobile: number;
  password: string;
  passwordConfirm: string | undefined;
}

const signUpSchema = new mongoose.Schema<ISignUp>({
  name: {
    type: String,
    required: [true, "Please tell your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, "Please provide your mobile number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    // required: [true, "Please confirm your password!"],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (this: ISignUp, el: string) {
        return el === this.password;
      },
      message: "Passwords are not the same!!",
    },
  },
});

signUpSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
export const Customer = mongoose.model<ISignUp>("customers", signUpSchema);
