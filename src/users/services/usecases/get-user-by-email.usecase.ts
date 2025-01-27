import { UseCase } from "src/common/usecase.common";
import { User } from "src/users/entities/user.entity";

export type GetUserByEmailPort = {
    email: string;
}

export interface GetUserByEmailUseCase extends UseCase<GetUserByEmailPort, User> {}
