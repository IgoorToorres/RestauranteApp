import express from 'express';
import cors from 'cors';
import session from 'express-session';
import userRoutes from './routes/users.js';
import restaurantRoutes from './routes/restaurants.js';
import locationRoutes from './routes/localizacoes.js';
import reviewRoutes from './routes/avaliacoes.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/usuarios', userRoutes);
app.use('/restaurantes', restaurantRoutes);
app.use('/localizacoes', locationRoutes);
app.use('/avaliacoes', reviewRoutes);
app.use('/auth', authRoutes);

app.listen(8800, () => {
    console.log('Server is running on port 8800');
});