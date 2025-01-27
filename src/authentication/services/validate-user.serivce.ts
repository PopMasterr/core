import { BadRequestException } from "@nestjs/common";
import { AuthRepositoryInterface } from "../repositories/auth-repository.interface";
import { ValidateUserPort, ValidateUserUseCase } from "./usecases/validate-user.usecase";
import * as bcrypt from "bcrypt";
import { User } from "src/users/entities/user.entity";

export class ValidateUserService implements ValidateUserUseCase {
    constructor (
        private readonly authRepository: AuthRepositoryInterface
    ) { }

    async execute(payload?: ValidateUserPort): Promise<User> {
        const {user, inputedPassword} = payload;

        const passwordMatches = await this.authRepository.validateUser(inputedPassword, user.password);
        if (passwordMatches === false) throw new BadRequestException('Password does not match');

        return user;
    }
}