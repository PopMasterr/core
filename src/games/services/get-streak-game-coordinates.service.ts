import { Game } from "../entities/game.entity";
import { StreakGame } from "../entities/streak-game.entity";
import { StreakGamesGame } from "../entities/streak-games-game.entity";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { StreakGamesGamesRepositoryInterface } from "../repositories/streak-games-games-repository.interface";
import { StreakGamesRepositoryInterface } from "../repositories/streak-games-repository.interface";
import { GetStreakGameCoordinatesDTO, GetStreakGameCoordinatesPort, GetStreakGameCoordinatesUseCase } from "./usecases/get-streak-game-coordinates.usecase";

export class GetStreakGameCoordinatesService implements GetStreakGameCoordinatesUseCase {
    constructor (
        private readonly streakGameRepository: StreakGamesRepositoryInterface,
        private readonly streakGamesGamesRepository: StreakGamesGamesRepositoryInterface,
        private readonly gameRepository: GameRepositoryInterface
    ) {}

    async execute(payload?: GetStreakGameCoordinatesPort): Promise<GetStreakGameCoordinatesDTO> {
        const { userId } = payload;

        // TODO: Extract streak games fetching to separate service and reuse it in GetStreakAnswerIsCorrectService
        const streakGame: StreakGame = await this.streakGameRepository.findlastByUserId(userId);
        const streakGamesGame: StreakGamesGame[] = await this.streakGamesGamesRepository.findLastTwoByStreakGameId(streakGame.id);
        const gameBlue: Game = await this.findGame(streakGamesGame[1].gameId);
        const gameRed: Game = await this.findGame(streakGamesGame[0].gameId);

        return {
            gameBlueCoord: {
                x1: gameBlue.x1,
                x2: gameBlue.x2,
                y1: gameBlue.y1,
                y2: gameBlue.y2
            },
            gameRedCoord: {
                x1: gameRed.x1,
                x2: gameRed.x2,
                y1: gameRed.y1,
                y2: gameRed.y2
            }
        }
        
    }

    private async findGame(gameId: number): Promise<Game> {
        return await this.gameRepository.findById(gameId);
    }
}

