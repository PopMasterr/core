import { Coordinates, PopulationResponse, CoordinatesResponse } from "src/population/types/population.types";
import { PopulationRepositoryInterface } from "../population-repository.interface";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class PopulationRepository implements PopulationRepositoryInterface {
    private client: AxiosInstance = axios.create({ baseURL: process.env.POPULATION_BASE_URL });

    async getPopulation(coordinates1: Coordinates, coordinates2: Coordinates, populationGuess: number): Promise<PopulationResponse> {
        try {
            const response: AxiosResponse = await this.client.get(
                '/getPopulation',
                { params: { x1: coordinates1.x, y1: coordinates1.y, x2: coordinates2.x, y2: coordinates2.y, guess: populationGuess} }
            );
            return response.data;
        } catch(e) {
            return null;
        }
    }

    async getCoordinates(): Promise<CoordinatesResponse> {
        try {
            const response: AxiosResponse = await this.client.get('/getCoordinates');
            return response.data;
        } catch(e) {
            return null;
        }
    }
}
