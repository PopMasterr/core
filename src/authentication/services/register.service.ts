import { User } from "src/users/entities/user.entity";
import { RegisterUseCase } from "./usecases/register.usecase";
import { AuthRepositoryInterface } from "../repositories/auth-repository.interface";

export class RegisterService implements RegisterUseCase {
    constructor(
        private readonly authRepository: AuthRepositoryInterface,
    ) {}

    async execute(payload?: User): Promise<User> {
        const newUser = this.authRepository.register(payload);

        return newUser;
    }
}
