import { StreakGame } from "../entities/streak-game.entity";
import { StreakGamesGame } from "../entities/streak-games-game.entity";
import { StreakGamesGamesRepositoryInterface } from "../repositories/streak-games-games-repository.interface";
import { StreakGamesRepositoryInterface } from "../repositories/streak-games-repository.interface";
import { CreateStreakGamePort, CreateStreakGameUseCase } from "./usecases/create-streak-game.usecase";
import { CreateStreakGamesDataUseCase } from "./usecases/create-streak-games-data.usecase";

export class CreateStreakGameService implements CreateStreakGameUseCase {
    constructor(
        private readonly streakGameRepository: StreakGamesRepositoryInterface,
        private readonly streakGamesGamesRepository: StreakGamesGamesRepositoryInterface,
        private readonly craeteStreakGamesDataService: CreateStreakGamesDataUseCase
    ) { }

    async execute(payload?: CreateStreakGamePort): Promise<void> {
        const userId = payload.userId;

        let streakGame: StreakGame = new StreakGame();
        streakGame.userId = userId;
        streakGame = await this.streakGameRepository.save(streakGame);

        const streakGamesGames: Array<StreakGamesGame> = await this.craeteStreakGamesDataService.execute({ streakGameId: streakGame.id });
        await this.streakGamesGamesRepository.save(streakGamesGames);
    }
}
