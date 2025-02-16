import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { GetUserByEmailPort, GetUserByEmailUseCase } from "./usecases/get-user-by-email.usecase";

@Injectable()
export class GetUserByEmailService implements GetUserByEmailUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) {}

    async execute(port: GetUserByEmailPort): Promise<User> {
        const { email } = port;

        const user: User = await this.userRepository.findByEmail(email);
        return user;
    }
}
