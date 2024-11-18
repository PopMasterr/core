import { Controller, Get, Inject, Query } from "@nestjs/common";
import { GetPopulationResult, GetPopulationUseCase } from "../services/usecases/get-population.usecase";
import { GetPopulationParams } from "../types/population-request.types";
import { PopulationDITokens } from "../di/population-tokens.di";

@Controller('populations')
export class PopulationController {
    constructor(
        @Inject(PopulationDITokens.GetPopulationUseCase)
        private readonly getPopulationService: GetPopulationUseCase,
    ) {}

    @Get()
    async getPopulation(
        @Query() params: GetPopulationParams
    ): Promise<GetPopulationResult> {
        const result: GetPopulationResult = await this.getPopulationService.execute({
            userId: 1,
            coordinates1: { x: params.x1, y: params.y1 },
            coordinates2: { x: params.x2, y: params.y2 },
            guess: params.guess,
        })

        return result;
    }
}
