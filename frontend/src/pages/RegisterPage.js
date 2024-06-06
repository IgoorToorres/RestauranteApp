import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/auth/register', { nome, email, senha });
      alert('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (e) {
      console.error('Erro ao registrar usuário: ', e);
      alert('Erro ao registrar usuário.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Registro</Typography>
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
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Registrar
        </Button>
      </form>
      <Button onClick={() => navigate('/login')} variant="text" color="primary">
        Já tem uma conta? Login
      </Button>
    </Container>
  );
}

export default RegisterPage;
