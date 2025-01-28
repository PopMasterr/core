import { GameDataResponse, PopulationResponse } from "../types/population.types";

export interface PopulationRepositoryInterface {
    getScore(populationGuess: number, population: number): Promise<PopulationResponse>;
    getGameData(): Promise<GameDataResponse>
}
