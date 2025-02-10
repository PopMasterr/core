import { UserMetrics } from "../entities/user-metrics.entity";
import { UserMetricsRepositoryInterface } from "../repositories/user-metrics-repository.interface";
import { UpdateUserMetricsHighestStreakPort, UpdateUserMetricsHighestStreakUseCase } from "./usecases/update-user-metrics-highest-streak.usecase";

export class UpdateUserMetricsHighestStreakService implements UpdateUserMetricsHighestStreakUseCase {
    constructor (
        private readonly userMetricsRepository: UserMetricsRepositoryInterface
    ) {}

    async execute(payload?: UpdateUserMetricsHighestStreakPort): Promise<void> {
        const { userId, streak } = payload;

        let userMetrics: UserMetrics = await this.userMetricsRepository.findByUserId(userId);

        if (userMetrics.highestStreak < streak){
            userMetrics.highestStreak = streak;
            await this.userMetricsRepository.saveEntity(userMetrics);
        }
    }
}
