import express from "express";
import { getLocalizacao, addLocalizacao, updateLocalizcao, deleteLocalizacao } from "../controller/localizacao.js";

const router = express.Router();

router.get("/", getLocalizacao);
router.post("/", addLocalizacao);
router.patch("/:id", updateLocalizcao);
router.delete("/:id", deleteLocalizacao);

export default router;
