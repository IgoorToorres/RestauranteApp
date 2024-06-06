import { db } from "../db.js";

export const getReviews = (_, res) => {
    const q = "SELECT * FROM avaliacao";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addReview = (req, res) => {
    const q = "INSERT INTO avaliacao(`ID_do_usuario`, `ID_do_restaurante`, `Nota`, `Comentario`) VALUES (?)";
    const values = [
        req.body.ID_do_usuario,
        req.body.ID_do_restaurante,
        req.body.Nota,
        req.body.Comentario
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Avaliação adicionada com sucesso!");
    });
};

export const updateReview = (req, res) => {
    const q = "UPDATE avaliacao SET `ID_do_usuario` = ?, `ID_do_restaurante` = ?, `Nota` = ?, `Comentario` = ? WHERE `ID_da_avaliacao` = ?";
    const values = [
        req.body.ID_do_usuario,
        req.body.ID_do_restaurante,
        req.body.Nota,
        req.body.Comentario
    ];
    db.query(q, [...values, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Avaliação atualizada com sucesso!");
    });
};

export const deleteReview = (req, res) => {
    const q = "DELETE FROM avaliacao WHERE `ID_da_avaliacao` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Avaliação deletada com sucesso!");
    });
};
