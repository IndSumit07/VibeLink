import express from "express";
import { getUserData, updateProfile } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";


const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.post("/update-profile", userAuth, updateProfile  );

export default userRouter