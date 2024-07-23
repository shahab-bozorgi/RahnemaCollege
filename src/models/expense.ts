import { User } from "./user";
import { Group } from "./group";

export interface Expense{
    id: string;
    description: string;
    amount: number;
    paidBy: User;
    group: Group;
    date: Date;
}

