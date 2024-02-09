import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
const authRouter=require('./routes/authRoutes');
dotenv.config({ path: "./.env" });
const app:Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
const DB:string=process.env.DATABASE as string;
mongoose.set("strictQuery", true);
mongoose.connect(DB).then((con) => {
  console.log("DB Connection successful!!");
});

app.use('/api/v1/users', authRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
