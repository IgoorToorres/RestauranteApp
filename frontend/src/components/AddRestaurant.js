import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRestaurant() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tipoCozinha, setTipoCozinha] = useState('');
  const [horarioFuncionamento, setHorarioFuncionamento] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/restaurantes', {
        nome,
        endereco,
        tipoCozinha,
        horarioFuncionamento
      });

      const restauranteId = response.data.ID_do_restaurante; // Certifique-se de pegar o ID do restaurante retornado pelo backend

      await axios.post(`http://localhost:8800/localizacoes`, {
        ID_do_restaurante: restauranteId,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      });

      setNome('');
      setEndereco('');
      setTipoCozinha('');
      setHorarioFuncionamento('');
      setLatitude('');
      setLongitude('');
      alert('Restaurante cadastrado com sucesso!');
      navigate("/");
    } catch (e) {
      console.error('Erro ao adicionar documento: ', e);
      alert('Erro ao cadastrar restaurante.');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Endereço"
          fullWidth
          margin="normal"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
        <TextField
          label="Tipo de Cozinha"
          fullWidth
          margin="normal"
          value={tipoCozinha}
          onChange={(e) => setTipoCozinha(e.target.value)}
        />
        <TextField
          label="Horário de Funcionamento"
          fullWidth
          margin="normal"
          value={horarioFuncionamento}
          onChange={(e) => setHorarioFuncionamento(e.target.value)}
        />
        <TextField
          label="Latitude"
          fullWidth
          margin="normal"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <TextField
          label="Longitude"
          fullWidth
          margin="normal"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar Restaurante
        </Button>
      </form>
    </Container>
  );
}

export default AddRestaurant;
