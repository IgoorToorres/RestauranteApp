import express from "express";
import { getRestaurantById, getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant } from "../controller/restaurant.js";

const router = express.Router();

router.get("/", getRestaurants);
router.post("/", addRestaurant);
router.patch("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);
router.get("/:id", getRestaurantById);

export default router;
