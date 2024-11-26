import { NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { GetUserPort, GetUserUseCase } from "./usecases/get-user.usecase";

export class GetUserService implements GetUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) {}

    async execute(payload: GetUserPort): Promise<User> {
        const { id } = payload;

        const user: User = await this.userRepository.findById(id);

        if(user === null) throw new NotFoundException();
        return user;
    }
}
