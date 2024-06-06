import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FetchUserId from './FetchUserId';
import { useNavigate } from 'react-router-dom';

function RateRestaurant() {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Erro: usuário não logado');
      return;
    }

    try {
      await axios.post('http://localhost:8800/avaliacoes', {
        ID_do_usuario: userId,
        ID_do_restaurante: id,
        Nota: parseInt(rating),
        Comentario: comment
      }, { withCredentials: true });
      setRating('');
      setComment('');
      alert('Avaliação enviada com sucesso!');
      navigate("/");
    } catch (e) {
      console.error('Erro ao adicionar avaliação: ', e);
      alert('Erro ao enviar avaliação.');
    }
  };

  return (
    <Container>
      <FetchUserId onUserIdFetched={setUserId} />
      <Typography variant="h6">Avaliar Restaurante</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nota"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <TextField
          label="Comentário"
          fullWidth
          margin="normal"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar Avaliação
        </Button>
      </form>
    </Container>
  );
}

export default RateRestaurant;
