import express from "express";

// Controller Functions
import { loginUser, signupUser } from "../controllers/user.controller.js";

const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Signup Route
router.post("/signup", signupUser);

export default router;
