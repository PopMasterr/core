import { NotFoundException } from "@nestjs/common";
import { UserMetrics } from "../entities/user-metrics.entity";
import { UserMetricsRepositoryInterface } from "../repositories/user-metrics-repository.interface";
import { UpdateUserMetricsPort, UpdateUserMetricsUseCase } from "./usecases/update-user-metrics.usecase";

export class UpdateUserMetricsService implements UpdateUserMetricsUseCase {
    constructor(private readonly userMetricsRepository: UserMetricsRepositoryInterface) {}

    async execute(payload: UpdateUserMetricsPort): Promise<void> {
        const { userId, score } = payload;

        const userMetrics: UserMetrics = await this.userMetricsRepository.findByUserId(userId);
        if(userMetrics === null) throw new NotFoundException();

        this.updateUserMetrics(userMetrics, score);
        await this.userMetricsRepository.saveEntity(userMetrics);
    }

    private updateUserMetrics(userMetrics: UserMetrics, score: number): void {
        userMetrics.totalPoints += score;
        userMetrics.gamesPlayed += 1;
        if(score === 5000) userMetrics.perfectGuesses += 1
    }
}

