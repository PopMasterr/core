import { UseCase } from "src/common/usecase.common";
import { User } from "src/users/entities/user.entity";

export interface RegisterUseCase extends UseCase<User, User> {}