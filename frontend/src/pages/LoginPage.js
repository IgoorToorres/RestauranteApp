import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/auth/login', { email, senha }, { withCredentials: true });
      const res = await axios.get('http://localhost:8800/auth/user', { withCredentials: true });
      setUser(res.data);
      alert('Login bem-sucedido!');
      navigate('/');
    } catch (e) {
      console.error('Erro ao fazer login: ', e);
      alert('Erro ao fazer login.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>
      <Button onClick={() => navigate('/register')} variant="text" color="primary">
        Não tem uma conta? Registre-se
      </Button>
    </Container>
  );
}

export default LoginPage;
