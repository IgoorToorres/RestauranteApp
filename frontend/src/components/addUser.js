// src/components/AddUser.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddUser() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/usuarios', {
        nome,
        email,
        senha
      });
      setNome('');
      setEmail('');
      setSenha('');
      alert('Usuário cadastrado com sucesso!');
      navigate('/home');

    } catch (e) {
      console.error('Erro ao adicionar usuário: ', e);
      alert('Erro ao cadastrar usuário.');
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
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          fullWidth
          margin="normal"
          value={senha}
          type='password'
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar Usuário
        </Button>
      </form>
    </Container>
  );
}

export default AddUser;
