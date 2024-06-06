import express from "express";
import { getUser, register, login, logout } from "../controller/auth.js";

const router = express.Router();

router.get("/user", getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
