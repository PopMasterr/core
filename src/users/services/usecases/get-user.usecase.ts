import { UseCase } from "src/common/usecase.common";
import { User } from "src/users/entities/user.entity";

export type GetUserPort = {
    id: number;
}

export interface GetUserUseCase extends UseCase<GetUserPort, User> {}
