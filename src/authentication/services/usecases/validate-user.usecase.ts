import { UseCase } from "src/common/usecase.common";
import { User } from "src/users/entities/user.entity";

export type ValidateUserPort = {
    user: User;
    inputedPassword: string
}

export interface ValidateUserUseCase extends UseCase<ValidateUserPort, User> {}
