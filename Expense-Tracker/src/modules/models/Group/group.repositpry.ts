import { User } from "../User/user";
import { Group } from "./group";

interface CreateGroup{
    name: string,
    users: User[]
}


export class GroupRepository{
    private groups: Group[]= []

    public getNextId(){
        return this.groups.length + 1
    }

    public create(group: CreateGroup){
        this.groups.push({...group , id:this.getNextId()})
    }
}