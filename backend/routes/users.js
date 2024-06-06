//users.js
import express from "express"
import { getUserById, addUser, deleteUser, getUsers, updateUser } from "../controller/user.js"

const router = express.Router()

router.get("/", getUsers);
router.post("/", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById); 

export default router;