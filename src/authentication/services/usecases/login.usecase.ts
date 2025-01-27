import { UseCase } from "src/common/usecase.common";
import { AccessToken } from "src/authentication/types/access-token.types";
import { AccessTokenPayload } from "src/authentication/types/access-token-payload.types";

export interface LoginUseCase extends UseCase<AccessTokenPayload, AccessToken> {}
