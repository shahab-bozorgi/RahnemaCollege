import { UserRepository } from "../user.repository";
import { UserDto } from "../dto/User.dto";
import { User } from "../user";

export const CreateUser = (
    dto: UserDto,
    userRepo: UserRepository,

) => 
    {
    const User = {
    id: userRepo.getNextId(),
    username:dto.username,
    password: dto.password,
}}
