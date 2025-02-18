import { Game } from "../entities/game.entity";
import { MultiplayerGame } from "../entities/multiplayer-game.entity";
import { MultiplayerGamesGame } from "../entities/multiplayer-games-game.entity";
import { MultiplayerGamesGamesRepositoryInterface } from "../repositories/multiplayer-games-games-repository.interface";
import { MultiplayerGamesRepositoryInterface } from "../repositories/multiplayer-games-repository.interface";
import { CreateGameUseCase } from "./usecases/create-game.usecase";
import { CreateMultiplayerGameDTO, CreateMultiplayerGamePort, CreateMultiplayerGameUseCase } from "./usecases/create-multiplayer-game.usecase";

export class CreateMultiplayerGameService implements CreateMultiplayerGameUseCase {
    constructor(
        private readonly multiplayerGamesRepository: MultiplayerGamesRepositoryInterface,
        private readonly multiplayerGamesGamesRepository: MultiplayerGamesGamesRepositoryInterface,
        private readonly createGameService: CreateGameUseCase
    ) { }

    async execute(payload?: CreateMultiplayerGamePort): Promise<CreateMultiplayerGameDTO> {
        const { numberOfRounds } = payload;

        const newMultiplayerGame: MultiplayerGame = new MultiplayerGame();
        await this.multiplayerGamesRepository.save(newMultiplayerGame);

        for (let i: number = 0; i < numberOfRounds; i++) {
            const game: Game = await this.createGameService.execute();

            const multiplayerGamesGame: MultiplayerGamesGame = new MultiplayerGamesGame({
                round: i,
                multiplayerGame: newMultiplayerGame,
                gameId: game.id
            });

            await this.multiplayerGamesGamesRepository.save(multiplayerGamesGame)
        }

        return { uniqueString: newMultiplayerGame.uniqueString };
    }
}
