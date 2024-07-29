import { v4 } from "uuid";
import { User } from "./user";


export interface CreateUser{
    username:string;
    password: string;
}


export class UserRepository{
    private users: User[]= []

    public getNextId(){
        return this.users.length + 1
    }

    public create(user: CreateUser){
        this.users.push({...user , id:this.getNextId()})
    }
}


