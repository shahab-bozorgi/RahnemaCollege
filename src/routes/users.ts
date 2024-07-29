import express, { Request, Response } from 'express';
import { User } from '../modules/models/User/user';

const router = express.Router();

const users: User[] = [
    { id: 1, username: 'hossein zamani', password: '1234' },
    { id: 2, username: 'ali rashidi', password: '1234' }
];

router.get('/', (req, res) => {
    res.json(users);
});

export default router;
