import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { Grid, Container } from '@mui/material';
import axios from 'axios';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8800/restaurantes');
        setRestaurants(response.data);
      } catch (e) {
        console.error('Erro ao buscar restaurantes: ', e);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {restaurants.map(restaurant => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id} style={{marginTop: 20}}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RestaurantList;
