import express from "express";
import { registerUser, loginUser, logoutUser ,getUser, deleteUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", getUser); // this will verify the token + return the curr user profile. 
authRouter.delete("/delete", deleteUser) // Khudka data del karna is imp

export default authRouter;