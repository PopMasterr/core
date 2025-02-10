import { UpdateUserMetricsHighestStreakUseCase } from "src/users/services/usecases/update-user-metrics-highest-streak.usecase";
import { StreakGame } from "../entities/streak-game.entity";
import { StreakGamesGame } from "../entities/streak-games-game.entity";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { StreakGamesGamesRepositoryInterface } from "../repositories/streak-games-games-repository.interface";
import { StreakGamesRepositoryInterface } from "../repositories/streak-games-repository.interface";
import { CreateGameUseCase } from "./usecases/create-game.usecase";
import { CreateStreakGameUseCase } from "./usecases/create-streak-game.usecase";
import { GetStreakAnswerIsCorrectDTO, GetStreakAnswerIsCorrectPort, GetStreakAnswerIsCorrectUseCase } from "./usecases/get-streak-answer-is-correct.usecase";

type findGamePopulationResult = {
    isBlue: Boolean;
    population: number;
}

export class GetStreakAnswerIsCorrectService implements GetStreakAnswerIsCorrectUseCase {
    constructor(
        private readonly streakGameRepository: StreakGamesRepositoryInterface,
        private readonly streakGamesGamesRepository: StreakGamesGamesRepositoryInterface,
        private readonly gameRepostory: GameRepositoryInterface,
        private readonly createGameService: CreateGameUseCase,
        private readonly createStreakGameService: CreateStreakGameUseCase,
        private readonly updateUserMetricsHighestStreakService: UpdateUserMetricsHighestStreakUseCase
    ) {}

    async execute(payload?: GetStreakAnswerIsCorrectPort): Promise<GetStreakAnswerIsCorrectDTO> {
        const { userId, choseBlue } = payload;

        // TODO: Handle null streakGame
        const streakGame: StreakGame = await this.streakGameRepository.findlastByUserId(userId);
        const streakGamesGames: StreakGamesGame[] = await this.streakGamesGamesRepository.findLastTwoByStreakGameId(streakGame.id);

        // TODO: Rethink how to rename blue, red
        const gameBlue: findGamePopulationResult = await this.findGamePopulation(streakGamesGames[1].gameId, true);
        const gameRed: findGamePopulationResult = await this.findGamePopulation(streakGamesGames[0].gameId, false);

        let result: GetStreakAnswerIsCorrectDTO = {
            isCorrect: false,
            populationBlue: gameBlue.population,
            populationRed: gameRed.population,
            streak: 0
        }

        if (gameBlue.population > gameRed.population && choseBlue) result.isCorrect = true;
        if (gameBlue.population < gameRed.population && !choseBlue) result.isCorrect = true;

        result.streak = await this.handleAnswerIsCorrectAndGetScore(result.isCorrect, streakGame.id, userId);
        await this.updateUserMetricsHighestStreakService.execute({userId: userId, streak: result.streak});

        await this.updateStreakGame(streakGame.id);

        return result;
    }

    private async findGamePopulation(gameId: number, isBlue: Boolean): Promise<findGamePopulationResult> {
        const game = await this.gameRepostory.findById(gameId);

        return {
            isBlue: isBlue,
            population: game.population
        }
    }

    private async updateStreakGame(streakGameId: number) {
        const game1 = await this.createGameService.execute();
        const game2 = await this.createGameService.execute();

        await this.assignGameToStreakGame(streakGameId, game1.id, true);
        await this.assignGameToStreakGame(streakGameId, game2.id, false);
    }

    private async assignGameToStreakGame(streakGameId: number, gameId: number, isBlue: Boolean): Promise<void> {
        const streakGamesGame: StreakGamesGame = new StreakGamesGame(
            {
                streakGameId: streakGameId,
                gameId: gameId,
                isBlue: isBlue,
            }
        );

        await this.streakGamesGamesRepository.save(streakGamesGame);
    }

    private async handleAnswerIsCorrectAndGetScore(isCorrect: Boolean, streakGameId: number, userId: number): Promise<number>{
        if (isCorrect) {
            await this.streakGameRepository.updateStreakById(streakGameId);
        } else {
            await this.streakGameRepository.setIsLostTrueById(streakGameId);
            // TODO: Remove this as new streak game is created through API call
            await this.createStreakGameService.execute({userId: userId});
        }

       return await this.streakGameRepository.getStreakById(streakGameId);
    }

}
