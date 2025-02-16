import { UpdateUserMetricsHighestStreakUseCase } from "src/users/services/usecases/update-user-metrics-highest-streak.usecase";
import { StreakGamesRepositoryInterface } from "../repositories/streak-games-repository.interface";
import { GetStreakAnswerIsCorrectDTO, GetStreakAnswerIsCorrectPort, GetStreakAnswerIsCorrectUseCase } from "./usecases/get-streak-answer-is-correct.usecase";
import { CreateStreakGamesDataUseCase } from "./usecases/create-streak-games-data.usecase";
import { FindStreakGamesGamesUseCase } from "./usecases/find-streak-games-games.usecase";
import { TerritorySide } from "../entities/types/create-streak-games-game-payload.type";

export class GetStreakAnswerIsCorrectService implements GetStreakAnswerIsCorrectUseCase {
    constructor(
        private readonly streakGameRepository: StreakGamesRepositoryInterface,
        private readonly updateUserMetricsHighestStreakService: UpdateUserMetricsHighestStreakUseCase,
        private readonly createStreakGamesDataService: CreateStreakGamesDataUseCase,
        private readonly findStreakGamesGamesService: FindStreakGamesGamesUseCase
    ) { }

    async execute(payload?: GetStreakAnswerIsCorrectPort): Promise<GetStreakAnswerIsCorrectDTO> {
        const { userId, chosenTerritorySide } = payload;

        const { streakGame, games } = await this.findStreakGamesGamesService.execute({ userId: userId })

        const gameBlue = { population: games[1].population, territorySide: TerritorySide.BLUE };
        const gameRed = { population: games[0].population, territorySide: TerritorySide.RED };

        let result: GetStreakAnswerIsCorrectDTO = {
            isCorrect: false,
            populationBlue: gameBlue.population,
            populationRed: gameRed.population,
            streak: 0
        }

        if (gameBlue.population > gameRed.population && chosenTerritorySide === TerritorySide.BLUE) result.isCorrect = true;
        if (gameBlue.population < gameRed.population && chosenTerritorySide === TerritorySide.RED) result.isCorrect = true;

        result.streak = await this.handleAnswerIsCorrectAndGetScore(result.isCorrect, streakGame.id, userId);
        await this.updateUserMetricsHighestStreakService.execute({ userId: userId, streak: result.streak });

        await this.createStreakGamesDataService.execute({ streakGameId: streakGame.id });

        return result;
    }

    private async handleAnswerIsCorrectAndGetScore(isCorrect: Boolean, streakGameId: number, userId: number): Promise<number> {
        if (isCorrect) {
            await this.streakGameRepository.updateStreakById(streakGameId);
        } else {
            await this.streakGameRepository.setIsLostTrueById(streakGameId);
        }

        return await this.streakGameRepository.getStreakById(streakGameId);
    }

}
