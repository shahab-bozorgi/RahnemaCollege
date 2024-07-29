import express, { Request, Response } from 'express';
import { Group } from '../modules/models/Group/group';
import { User } from '../modules/models/User/user';
import { Expense } from '../modules/models/Expense/expense_rep';

const router = express.Router();

const users: User[] = [
    { id: '1', username: 'hossein zamani', password: '1234' },
    { id: '2', username: 'ali rashidi', password: '1234' }
];

const groups: Group[] = [
    { id: '1', name: 'halghe', users: [users[0], users[1]] },
    { id: '3', name: 'gilas', users: [users[0], users[1]] }
];

const expenses: Expense[] = [];

router.get('/:groupId/balances', (req: Request, res: Response) => { 
    const { groupId } = req.params; 
    const group = groups.find(group => group.id === groupId);

    if (!group) {
        return res.status(404).send({ message: 'Group not found' });
    } 

    const userBalances: { [key: string]: number } = {};
    group.users.forEach(user => userBalances[user.id] = 0);

    expenses.filter(expense => expense.group.id === groupId).forEach(expense => { 
        userBalances[expense.paidBy.id] += expense.amount; 
    }); 

    const totalExpense = Object.values(userBalances).reduce((acc, amount) => acc + amount, 0);
    const splitExpense = totalExpense / group.users.length; 

    group.users.forEach(user => { userBalances[user.id] -= splitExpense; });
    res.json(userBalances);
});

export default router;
