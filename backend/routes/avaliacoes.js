import express from 'express';
import { getReviews, addReview, updateReview, deleteReview } from '../controller/avaliacao.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", getReviews);
router.post("/", isAuthenticated, addReview); 
router.patch("/:id", isAuthenticated, updateReview); 
router.delete("/:id", isAuthenticated, deleteReview); 

export default router;
