import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

function ViewReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchReviewsAndUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/avaliacoes?restauranteId=${id}`);
        const reviewsData = response.data;

        const usersMap = {};
        if (reviewsData.length > 0) {
          for (const review of reviewsData) {
            if (!usersMap[review.ID_do_usuario]) {
              const userResponse = await axios.get(`http://localhost:8800/usuarios/${review.ID_do_usuario}`);
              const userData = userResponse.data;
              usersMap[review.ID_do_usuario] = userData.Nome;
            }
          }
        }

        setUsers(usersMap);
        setReviews(reviewsData);
      } catch (e) {
        console.error('Erro ao buscar avaliações: ', e);
      }
    };
    fetchReviewsAndUsers();
  }, [id]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Avaliações do Restaurante</Typography>
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} md={6} lg={4} key={review.ID_da_avaliacao}>
            <Card>
              <CardContent>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{users[review.ID_do_usuario] ? users[review.ID_do_usuario][0] : 'U'}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Nota: ${review.Nota}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {users[review.ID_do_usuario] || 'Desconhecido'}
                        </Typography>
                        {" — " + review.Comentario}
                      </>
                    }
                  />
                </ListItem>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewReviews;
