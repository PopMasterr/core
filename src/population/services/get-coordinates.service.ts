import { NotFoundException } from "@nestjs/common";
import { PopulationRepositoryInterface } from "../repositories/population-repository.interface";
import { CoordinatesResponse } from "../types/population.types";
import { GetCoordinatesUseCase } from "./usecases/get-coordinates.usecase";

export class GetCoordinatesService implements GetCoordinatesUseCase {
    constructor(private readonly populationRepository: PopulationRepositoryInterface) {}

    async execute(): Promise<CoordinatesResponse> {
        const coordinatesResult: CoordinatesResponse = await this.populationRepository.getCoordinates();

        if (coordinatesResult === null) throw new NotFoundException();

        return coordinatesResult;
    }
}
