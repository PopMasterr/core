import { StreakGame } from "../entities/streak-game.entity";
import { StreakGamesRepositoryInterface } from "../repositories/streak-games-repository.interface";
import { CreateStreakGamePort, CreateStreakGameUseCase } from "./usecases/create-streak-game.usecase";
import { CreateStreakGamesDataUseCase } from "./usecases/create-streak-games-data.usecase";

export class CreateStreakGameService implements CreateStreakGameUseCase {
    constructor(
        private readonly streakGameRepository: StreakGamesRepositoryInterface,
        private readonly createStreakGamesDataService: CreateStreakGamesDataUseCase
    ) { }

    async execute(payload?: CreateStreakGamePort): Promise<void> {
        const userId = payload.userId;

        let streakGame: StreakGame = new StreakGame();
        streakGame.userId = userId;
        streakGame = await this.streakGameRepository.save(streakGame);

        await this.createStreakGamesDataService.execute({ streakGameId: streakGame.id });
    }
}
