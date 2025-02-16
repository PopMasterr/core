import { PopulationResponse } from "src/population/types/population.types";
import { GetClassicGameScorePort, GetClassicGameScoreUseCase } from "./usecases/get-classic-game-score.usecase";
import { GetScoreUseCase } from "src/population/services/usecases/get-score.usecase";
import { ClassicGamesRepositoryInterface } from "../repositories/classic-games-repository.interface";
import { ClassicGamesGamesRepositoryInterface } from "../repositories/classic-games-games-repository.interface";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { ClassicGamesGame } from "../entities/classic-games-game.entity";
import { CreateGameUseCase } from "./usecases/create-game.usecase";
import { ClassicGame } from "../entities/classic-game.entity";
import { NotFoundException } from "@nestjs/common";
import { Game } from "../entities/game.entity";

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

        const classicGame: ClassicGame = await this.classicGameRepository.findLastByUserId(userId);
        if (!classicGame) throw new NotFoundException();
        const classicGamesGame: ClassicGamesGame = await this.classicGamesGamesRepository.findLastByClassicGameId(classicGame.id);
        const population = await this.getGamePopulation(classicGamesGame.gameId);

        const result: PopulationResponse = await this.getGameScoreService.execute({
            populationGuess: populationGuess, 
            population: population, 
            userId: userId
        });

        result.population = population;
        
        await this.classicGamesGamesRepository.saveScoreById(classicGamesGame.id, result.score)
        await this.updateGame(classicGame.id);

        return result;
    }

    private async getGamePopulation(gameId: number): Promise<number> {
        const game: Game = await this.gameRepository.findById(gameId);
        if (!game) throw new NotFoundException();
        return game.population;
    } 

    private async updateGame(classicGameId: number): Promise<void> {
        const game: Game = await this.createGameService.execute();

        await this.assignGameToClassicGame(classicGameId, game.id);
    }

    private async assignGameToClassicGame(classicGameId: number, gameId: number): Promise<void> {
        const classicGamesGame: ClassicGamesGame = new ClassicGamesGame({
            classicGameId: classicGameId,
            gameId: gameId
        })
        await this.classicGamesGamesRepository.save(classicGamesGame);
    }
}
