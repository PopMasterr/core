import { GameDataResponse, PopulationResponse } from "src/population/types/population.types";
import { PopulationRepositoryInterface } from "../population-repository.interface";
import axios, { AxiosInstance, AxiosResponse } from "axios";


export class PopulationRepository implements PopulationRepositoryInterface {
    private client: AxiosInstance = axios.create({ baseURL: process.env.POPULATION_BASE_URL });
    
    async getScore(populationGuess: number, population: number): Promise<PopulationResponse> {
        try {
            const response: AxiosResponse = await this.client.get(
                '/getScore',
                { params: {guess: populationGuess, population: population} }
            );
            return response.data;
        } catch(e) {
            return null;
        }
    }

    async getGameData(): Promise<GameDataResponse> {
        try {
            const response: AxiosResponse = await this.client.get( '/getData' );
            return response.data;
        } catch (e) {
            return null;
        }
    }
}

