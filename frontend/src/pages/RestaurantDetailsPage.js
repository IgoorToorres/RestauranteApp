import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

function RestaurantDetailsPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/restaurantes/${id}`);
        setRestaurant(response.data);
      } catch (e) {
        console.error('Erro ao buscar detalhes do restaurante: ', e);
      }
    };
    fetchRestaurantDetails();
  }, [id]);

  if (!restaurant) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Container>
      <Card style={{marginTop: 20}}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Detalhes do Restaurante</Typography>
          <Typography variant="h5">{restaurant.Nome}</Typography>
          <Typography color="textSecondary">{restaurant.Endereco}</Typography>
          <Typography color="textSecondary">Tipo de Cozinha: {restaurant.Tipo_de_cozinha}</Typography>
          <Typography color="textSecondary">Horário de Funcionamento: {restaurant.Horario_funcionamento}</Typography>
          <Typography color="textSecondary">ID: {restaurant.ID_do_restaurante}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RestaurantDetailsPage;
