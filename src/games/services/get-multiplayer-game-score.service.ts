import { GetScoreUseCase } from "src/population/services/usecases/get-score.usecase";
import { MultiplayerGamesGamesRepositoryInterface } from "../repositories/multiplayer-games-games-repository.interface";
import { MultiplayerGamesGamesScoresRepositoryInterface, SumsOfScores } from "../repositories/multiplayer-games-games-scores-repository.interface";
import { GetMultiplayerGameScorePort, GetMultiplayerGameScoreDTO, GetMultiplayerGameScoreUseCase, UsernameAndScore } from "./usecases/get-multiplayer-game-score.usecase";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { MultiplayerGamesGame } from "../entities/multiplayer-games-game.entity";
import { Game } from "../entities/game.entity";
import { PopulationResponse } from "src/population/types/population.types";
import { MultiplayerGamesGamesScore } from "../entities/multiplayer-games-games-score.entity";
import { GetUserUseCase } from "src/users/services/usecases/get-user.usecase";
import { NotFoundException } from "@nestjs/common";

export class GetMultiplayerGameScoreService implements GetMultiplayerGameScoreUseCase {
    constructor (
        private readonly multiplayerGamesGamesScoresRepository: MultiplayerGamesGamesScoresRepositoryInterface,
        private readonly multiplayerGamesGamesRepository: MultiplayerGamesGamesRepositoryInterface,
        private readonly getScoreService: GetScoreUseCase,
        private readonly gamesRepository: GameRepositoryInterface,
        private readonly getUserService: GetUserUseCase
    ) {}
    
    async execute(payload?: GetMultiplayerGameScorePort): Promise<GetMultiplayerGameScoreDTO> {
        const { uniqueString, round, userId, populationGuess } = payload;

        const multiplayerGamesGame: MultiplayerGamesGame = await this.multiplayerGamesGamesRepository.findByUniqueStringAndRound(uniqueString, round-1);
        if (!multiplayerGamesGame) return;
        const game: Game = await this.gamesRepository.findById(multiplayerGamesGame.gameId);
        if (!game) return;

        const score: PopulationResponse = await this.getScoreService.execute({userId: userId, populationGuess: populationGuess, population: game.population});

        let multiplayerGamesGamesScore: MultiplayerGamesGamesScore = new MultiplayerGamesGamesScore();
        multiplayerGamesGamesScore.multiplayerGamesGame = multiplayerGamesGame;
        multiplayerGamesGamesScore.score = score.score;
        multiplayerGamesGamesScore.userId = userId;

        await this.multiplayerGamesGamesScoresRepository.save(multiplayerGamesGamesScore);
        let allScores: SumsOfScores[] = await this.multiplayerGamesGamesScoresRepository.findAllSumsOfScoresByUniqueStringUpToRound(uniqueString, round-1);

        const usernameAndScores: UsernameAndScore[] = await Promise.all(
            allScores.map(async (userScore) => {
                const user = await this.getUserService.execute({ id: userScore.userId });
                if (!user) throw new NotFoundException();
                return {username: user.username, score: userScore.totalScore};
            })
        );

        return {
            currentGameScore: score.score,
            sumsOfScores: usernameAndScores,
            currentGamePopulation: score.population
        }
    }
}
