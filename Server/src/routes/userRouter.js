import express from "express";
import { signup,signin } from "../controller/userController.js";

const userRouter = express.Router();

// Signup route
userRouter.post("/signup", signup);

// Signin route (optional, ready for later)
userRouter.post("/signin", signin);

export default userRouter;
