import { PopulationResponse } from "src/population/types/population.types";
import { GetClassicGameScorePort, GetClassicGameScoreUseCase } from "./usecases/get-classic-game-score.usecase";
import { GetScorePort, GetScoreUseCase } from "src/population/services/usecases/get-score.usecase";
import { ClassicGamesRepositoryInterface } from "../repositories/classic-games-repository.interface";
import { ClassicGamesGamesRepositoryInterface } from "../repositories/classic-games-games-repository.interface";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { ClassicGamesGame } from "../entities/classic-games-game.entity";
import { CreateGameUseCase } from "./usecases/create-game.usecase";

export class GetClassicGameScoreSerivce implements GetClassicGameScoreUseCase {
    constructor(
        private readonly getGameScoreService: GetScoreUseCase,
        private readonly gameRepository: GameRepositoryInterface,
        private readonly classicGameRepository: ClassicGamesRepositoryInterface,
        private readonly classicGamesGamesRepository: ClassicGamesGamesRepositoryInterface,
        private readonly createGameService: CreateGameUseCase,
    ) { }

    async execute(payload?: GetClassicGameScorePort): Promise<PopulationResponse> {
        const { userId, populationGuess } = payload;

        // TODO: Handle null classic game => NotFoundException
        const classicGameId: number = (await this.classicGameRepository.findLastByUserId(userId)).id;
        const classicGamesGame: ClassicGamesGame = await this.classicGamesGamesRepository.findLastByClassicGameId(classicGameId);
        const population = await this.getGamePopulation(classicGamesGame.gameId);

        const result: PopulationResponse = await this.getGameScoreService.execute({
            populationGuess: populationGuess, 
            population: population, 
            userId: userId
        });

        result.population = population;
        
        await this.classicGamesGamesRepository.saveScoreById(classicGamesGame.id, result.score)
        await this.updateGame(classicGameId);

        return result;
    }

    private async getGamePopulation(gameId: number): Promise<number> {
        // Handle null exceptions
        return (await this.gameRepository.findById(gameId)).population;
    } 

    private async updateGame(classicGameId: number): Promise<void> {
        // Handle null cases
        const gameId: number = (await this.createGameService.execute()).id;
        await this.assignGameToClassicGame(classicGameId, gameId);
    }

    private async assignGameToClassicGame(classicGameId: number, gameId: number): Promise<void> {
        const classicGamesGame: ClassicGamesGame = new ClassicGamesGame({
            classicGameId: classicGameId,
            gameId: gameId
        })
        await this.classicGamesGamesRepository.save(classicGamesGame);
    }
}
