import express from 'express';
import usersRouter from './routes/users';
import expensesRouter from './routes/expenses';
import groupsRouter from './routes/groups';

export const app = express();

app.use(express.json());


app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);
app.use('/groups', groupsRouter);

app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});
