import { User } from "src/users/entities/user.entity";
import { AccessToken } from "../types/access-token.types";
import { AccessTokenPayload } from "../types/access-token-payload.types";

export interface AuthRepositoryInterface {
    validateUser(inputedPassword: string, correctPassword: string): Promise<Boolean>;
    login(user: AccessTokenPayload): Promise<AccessToken>;
    register(user: User): Promise<User>;
}
