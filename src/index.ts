import express from 'express';

import errorMiddleware from './middlewares/error.middleware';

import users from './routes/users.route';

const app = express();

app.use(express.json());

app.use('/users', users);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => console.log(`Escutando na porta ${process.env.PORT}`));
