import { db } from "../db.js";
import bcrypt from 'bcryptjs';

export const register = (req, res) => {
    const q = "INSERT INTO usuario(`Nome`, `Email`, `Senha`) VALUES (?)";
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.senha, salt);
    const values = [
        req.body.nome,
        req.body.email,
        hashedPassword
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Usuário registrado com sucesso!");
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM usuario WHERE Email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Usuário não encontrado!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.senha, data[0].Senha);
        if (!isPasswordCorrect) return res.status(400).json("Senha incorreta!");

        req.session.user = data[0]; // Certifique-se de que a sessão está sendo configurada corretamente
        return res.status(200).json("Login bem-sucedido!");
    });
};

export const getUser = (req, res) => {
    if (req.session.user) {
        return res.status(200).json(req.session.user);
    } else {
        return res.status(401).json("Usuário não está logado!");
    }
};


export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Logout bem-sucedido!");
    });
};
