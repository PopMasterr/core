import { Coordinates, CoordinatesResponse, PopulationResponse } from "../types/population.types";

export interface PopulationRepositoryInterface {
    getPopulation(coordinates1: Coordinates, coordinates2: Coordinates, populationGuess: number): Promise<PopulationResponse>;
    getCoordinates(): Promise<CoordinatesResponse>;
}
