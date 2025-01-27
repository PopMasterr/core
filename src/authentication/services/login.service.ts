import { AuthRepositoryInterface } from "../repositories/auth-repository.interface";
import { AccessTokenPayload } from "../types/access-token-payload.types";
import { AccessToken } from "../types/access-token.types";
import { LoginUseCase } from "./usecases/login.usecase";

export class LoginService implements LoginUseCase {
    constructor(
        private readonly authRepository: AuthRepositoryInterface
    ) {}

    async execute(payload?: AccessTokenPayload): Promise<AccessToken> {
        const accessToken = await this.authRepository.login(payload);

        return accessToken;
    }
}