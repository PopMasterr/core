import { UseCase } from "src/common/usecase.common";

export type CreateMultiplayerGamePort = {
    numberOfRounds: number;
}

export type CreateMultiplayerGameDTO = {
    uniqueString: string;
}


export interface CreateMultiplayerGameUseCase extends UseCase<CreateMultiplayerGamePort, CreateMultiplayerGameDTO> {}
