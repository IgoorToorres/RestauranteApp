import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5">{restaurant.Nome}</Typography>
        <Typography color="textSecondary">{restaurant.Endereco}</Typography>
        <Typography color="textSecondary">{restaurant.ID_do_restaurante}</Typography>
        <Button
          component={Link}
          to={`/rate/${restaurant.ID_do_restaurante}`}
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          Rate
        </Button>
        <Button
          component={Link}
          to={`/reviews/${restaurant.ID_do_restaurante}`}
          variant="contained"
          color="secondary"
          style={{ marginTop: '10px', marginLeft: '10px' }}
        >
          View Reviews
        </Button>
        <Button
          component={Link}
          to={`/restaurant/${restaurant.ID_do_restaurante}`}
          variant="contained"
          color="primary"
          style={{ marginTop: '10px', marginLeft: '10px' }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
