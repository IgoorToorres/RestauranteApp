import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuario";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = "INSERT INTO usuario(`Nome`, `Email`, `Senha`) VALUES (?)";
    const values = [
        req.body.nome,
        req.body.email,
        req.body.senha,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Usuário adicionado com sucesso!");
    });
};

export const updateUser = (req, res) => {
    const q = "UPDATE usuario SET `Nome` = ?, `Email` = ?, `Senha` = ? WHERE `ID_do_usuario` = ?";
    const values = [
        req.body.nome,
        req.body.email,
        req.body.senha,
    ];
    db.query(q, [...values, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Usuário atualizado com sucesso!");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuario WHERE `ID_do_usuario` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Usuário deletado com sucesso!");
    });
};

export const getUserById = (req, res) => {
    const q = "SELECT * FROM usuario WHERE ID_do_usuario = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Usuário não encontrado!");
        return res.status(200).json(data[0]);
    });
};
