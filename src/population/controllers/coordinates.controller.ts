import { Controller, Get, Inject } from "@nestjs/common";
import { CoordinatesResponse } from "../types/population.types";
import { GetCoordinatesUseCase } from "../services/usecases/get-coordinates.usecase";
import { PopulationDITokens } from "../di/population-tokens.di";

@Controller('coordinates')
export class CoordinatesController {
    constructor (
        @Inject(PopulationDITokens.GetCoordinatesUseCase)
        private readonly getCoordinatesService: GetCoordinatesUseCase
    ) {}

    @Get()
    async getCoordinates(): Promise<CoordinatesResponse> {
        const result: CoordinatesResponse = await this.getCoordinatesService.execute();

        return result;
    }
}