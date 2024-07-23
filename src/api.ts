import express, { Request, Response, NextFunction } from 'express';
import { User } from './models/user';
import { Group } from './models/group';
import { Expense } from './models/expense';
import { v4 as uuidv4 } from 'uuid';

export const app = express();
const port = 3000;

const users: User[] = [
      { id: '1', username: 'hossein zamani', password: '1234' },
      { id: '2', username: 'ali rashidi', password: '1234' }
];

const groups: Group[] = [
    { id: '1', name: 'halghe', users: [users[0], users[1]] },
    { id: '3', name: 'gilas', users: [users[0], users[1]] }
];

const expenses: Expense[] = [];

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/expenses', (req, res) => {
    const { description, amount, paidById, groupId, date } = req.body;

    if (!description ||  !amount ||  !paidById || !groupId || !date) {
        return res.status(400).send({ message: 'Description, amount, paidById, groupId, and date are required' });
    }

    const paidBy = users.find(user => user.id === paidById);
    if (!paidBy) {
        return res.status(404).send({ message: 'User not found' });
    }

    const group = groups.find(group => group.id === groupId);
    if (!group) {
        return res.status(404).send({ message: 'Group not found' });
    }
    
    const newExpense: Expense = {
        id: uuidv4(),
        description,
        amount,
        paidBy,
        group,
        date: new Date(date)
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.get('/expenses/paid-by/:userId', (req, res) => {
    const { userId } = req.params;
    const userExpenses = expenses.filter(expense => expense.paidBy.id === userId);
    res.json(userExpenses);
});

app.get('/expenses/for-user/:userId', (req, res) => {
    const { userId } = req.params;
    const userExpenses = expenses.filter(expense => expense.group.users.some(user => user.id === userId));

    res.json(userExpenses);
});


app.get('/group/:groupId/balances', (req, res) => { 
    const { groupId } = req.params; 
    const group = groups.find(group => group.id === groupId);

    if (!group) { return res.status(404).send({ message: 'Group not found' });} 
        const userBalances: { [key: string]: number } = {};
        group.users.forEach(user => userBalances[user.id] = 0);

        expenses.filter(expense => expense.group.id === groupId).forEach(expense => { userBalances[expense.paidBy.id] += expense.amount; }); 

        const totalExpense = Object.values(userBalances).reduce((acc, amount) => acc + amount, 0);
        const splitExpense = totalExpense / group.users.length; 

        group.users.forEach(user => { userBalances[user.id] -= splitExpense; });
        res.json(userBalances);
});
app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


