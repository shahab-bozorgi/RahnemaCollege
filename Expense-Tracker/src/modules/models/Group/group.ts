import { User } from '../User/user';

export interface Group {
    id: number;
    name: string;
    users: User[];
}
