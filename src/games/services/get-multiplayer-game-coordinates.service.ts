import { Game } from "../entities/game.entity";
import { MultiplayerGamesGame } from "../entities/multiplayer-games-game.entity";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { MultiplayerGamesGamesRepositoryInterface } from "../repositories/multiplayer-games-games-repository.interface";
import { GameDTO } from "./usecases/create-classic-game.usecase";
import { GetMultiplayerGameCoordinatesDTO, GetMultiplayerGameCoordinatesPort, GetMultiplayerGameCoordinatesUseCase } from "./usecases/get-multiplayer-game-coordinates.usecase";

export class GetMultiplayerGameCoordinatesService implements GetMultiplayerGameCoordinatesUseCase {
    constructor (
        private readonly multiplayerGamesGamesRepository: MultiplayerGamesGamesRepositoryInterface,
        private readonly gamesRepository: GameRepositoryInterface
    ) {}
    
    async execute(payload?: GetMultiplayerGameCoordinatesPort): Promise<GetMultiplayerGameCoordinatesDTO> {
        const { uniqueString } = payload;

        const multiplayerGamesGames: MultiplayerGamesGame[] = await this.multiplayerGamesGamesRepository.findAllByUniqueString(uniqueString);
        const games: GameDTO[] = await Promise.all(
            multiplayerGamesGames.map(async (multiplayerGamesGame) => {
                const game: Game = await this.gamesRepository.findById(multiplayerGamesGame.gameId);
                return {
                    x1: game.x1,
                    y1: game.y1,
                    x2: game.x2,
                    y2: game.y2
                }
            })
        );

        return {
            gameCoordinates: games
        }
    }
}
