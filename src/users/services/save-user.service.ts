import { BadRequestException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { SaveUserPort, SaveUserUseCase } from "./usecases/save-user.usecase";

export class SaveUserService implements SaveUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) {}

    async execute(payload: SaveUserPort): Promise<User> {
        const { username, email, password } = payload;

        const user: User = new User();
        user.username = username;
        user.email = email;
        user.password = password;

        const savedUser = this.userRepository.saveEntity(user);

        if (savedUser === null) throw new BadRequestException();
        return savedUser;
    }
}
