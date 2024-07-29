import { UserDto } from "../dto/user.dto";
import { UserRepository } from "../user.repository";



export const CreateUser = (
    dto: UserDto,
    userRepo: UserRepository,

) => 
    {
    const User = {
    id: userRepo.getNextId(),
    username:dto.username,
    password: dto.password,
    }


    // userRepo.create(User)
    return User;
}
