import { db } from "../db.js";

export const getRestaurants = (_, res) => {
    const q = "SELECT * FROM restaurante";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getRestaurantById = (req, res) => {
    const q = "SELECT * FROM restaurante WHERE ID_do_restaurante = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Restaurante não encontrado!");
      return res.status(200).json(data[0]);
    });
  };

export const addRestaurant = (req, res) => {
    const q = "INSERT INTO restaurante(`Nome`, `Endereco`, `Tipo_de_cozinha`, `Horario_funcionamento`) VALUES (?)";
    const values = [
      req.body.nome,
      req.body.endereco,
      req.body.tipoCozinha,
      req.body.horarioFuncionamento
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      
      const restaurantId = data.insertId; // Certifique-se de pegar o ID do restaurante inserido
      return res.status(200).json({ ID_do_restaurante: restaurantId });
    });
  };

export const updateRestaurant = (req, res) => {
    const q = "UPDATE restaurante SET `Nome` = ?, `Endereco` = ?, `Tipo_de_cozinha` = ?, `Horario_funcionamento` = ? WHERE `id` = ?";
    const values = [
        req.body.nome,
        req.body.endereco,
        req.body.tipoCozinha,
        req.body.horarioFuncionamento
    ];
    db.query(q, [...values, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Restaurante atualizado com sucesso!");
    });
};

export const deleteRestaurant = (req, res) => {
    const q = "DELETE FROM restaurante WHERE `id` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Restaurante deletado com sucesso!");
    });
};
