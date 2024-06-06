import { db } from "../db.js";

export const getLocalizacao = (_, res) => {
    const q = "SELECT * FROM localizacao";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addLocalizacao = (req, res) => {
    const q = "INSERT INTO localizacao(`ID_do_restaurante`, `Latitude`, `Longitude`) VALUES (?)";
    const values = [
        req.body.ID_do_restaurante,
        req.body.latitude,
        req.body.longitude
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Localização adicionada com sucesso!");
    });
};


export const updateLocalizcao = (req, res) => {
    const q = "UPDATE localizacao SET `latitude` = ?, `longitude` = ? WHERE `id` = ?";
    const values = [
        req.body.latitude,
        req.body.longitude
    ];
    db.query(q, [...values, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Localização atualizada com sucesso!");
    });
};

export const deleteLocalizacao = (req, res) => {
    const q = "DELETE FROM localizacao WHERE `id` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Localização deletada com sucesso!");
    });
};