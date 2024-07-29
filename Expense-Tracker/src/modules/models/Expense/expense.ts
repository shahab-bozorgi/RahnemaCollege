import { Group } from '../Group/group';
import { User } from '../User/user';

export interface Expense {
    id: number;
    description: string;
    cost: number;
    paidBy: User;
    group: Group;
    date: Date;
}
