
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../modules/models/Group/group';
import { User } from '../modules/models/User/user';
import { Expense } from '../modules/models/Expense/expense_rep';
import { number } from 'zod';

const app = express.Router();
let nextUserId = 3; // برای افزایش خودکار شناسه‌ها
let nextGroupId = 4;
let nextExpenseId = 1;

const users: User[] = [
    { id: 1, username: 'hossein zamani', password: '1234' },
    { id: 2, username: 'ali rashidi', password: '1234' }
];

const groups: Group[] = [
    { id: 1, name: 'halghe', users: [users[0], users[1]] },
    { id: 3, name: 'gilas', users: [users[0], users[1]] }
];

const expenses: Expense[] = [];

app.use(express.json());

app.use((req: Request, res: Response, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

app.post('/expenses', (req: Request, res: Response) => {
    const { description, cost, paidById, groupId, date } = req.body;

    if (!description || !cost || !paidById || !groupId || !date) {
        return res.status(400).send({ message: 'Description, cost, paidById, groupId, and date are required' });
    }

    const paidBy = users.find(user => user.id === paidById);
    if (!paidBy) {
        return res.status(404).send({ message: 'User not found' });
    }

    const group = groups.find(group => group.id === groupId);
    if (!group) {
        return res.status(404).send({ message: 'Group not found' });
    }

    const id = nextExpenseId++;
    const newExpense: Expense = {
        id,
        description,
        cost,
        paidBy,
        group,
        date: new Date(date)
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.get('/expenses/paid-by/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const userExpenses = expenses.filter(expense => expense.paidBy.id === Number(userId));
    res.json(userExpenses);
});

app.get('/expenses/for-user/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const userExpenses = expenses.filter(expense => expense.group.users.some(user => user.id === Number(userId)));
    res.json(userExpenses);
});
export default app;
