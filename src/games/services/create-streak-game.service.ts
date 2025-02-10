import { Game } from "../entities/game.entity";
import { StreakGame } from "../entities/streak-game.entity";
import { StreakGamesGame } from "../entities/streak-games-game.entity";
import { StreakGamesGamesRepositoryInterface } from "../repositories/streak-games-games-repository.interface";
import { StreakGamesRepositoryInterface } from "../repositories/streak-games-repository.interface";
import { CreateGameUseCase } from "./usecases/create-game.usecase";
import { CreateStreakGamePort, CreateStreakGameUseCase } from "./usecases/create-streak-game.usecase";

export class CreateStreakGameService implements CreateStreakGameUseCase {
    constructor(
        private readonly streakGameRepository: StreakGamesRepositoryInterface,
        private readonly createGameService: CreateGameUseCase,
        private readonly streakGamesGamesRepository: StreakGamesGamesRepositoryInterface
    ) { }

    async execute(payload?: CreateStreakGamePort): Promise<void> {
        const userId = payload.userId;

        let streakGame: StreakGame = new StreakGame();
        streakGame.userId = userId;
        streakGame = await this.streakGameRepository.save(streakGame);

        // TODO: Extract streak games games creation and saving and reuse in GetStreakAnswerIsCorrectService
        const streakGamesGames: Array<StreakGamesGame> = await this.createStreakGames(streakGame.id);
        await this.streakGamesGamesRepository.save(streakGamesGames);
    }

    private async createStreakGames(streakGameId: number): Promise<Array<StreakGamesGame>> {
        const game1: Game = await this.createGameService.execute();
        const game2: Game = await this.createGameService.execute();

        return [
            new StreakGamesGame({
                streakGameId: streakGameId,
                gameId: game1.id,
                isBlue: true,
            }), 
            new StreakGamesGame({
                streakGameId: streakGameId,
                gameId: game2.id,
                isBlue: false,
            })
        ];
    }
}
