import { CheckViableAchievementsUseCase } from "src/achievements/services/usecases/check-viable-achievements.usecase";
import { AddUserAchievementsPort, AddUserAchievementsUseCase } from "./usecases/add-user-achievements.usecase";
import { UserMetricsRepositoryInterface } from "../repositories/user-metrics-repository.interface";
import { UserAchievementsRepositoryInterface } from "../repositories/user-achievements-repository.interface";
import { UserMetrics } from "../entities/user-metrics.entity";
import { UserAchievement } from "../entities/user-achievements.entity";

export class AddUserAchievementsService implements AddUserAchievementsUseCase {
    constructor (
        private readonly userAchievementsRepository: UserAchievementsRepositoryInterface,
        private readonly checkViableAchievementsService: CheckViableAchievementsUseCase,
        private readonly userMetricsRepository: UserMetricsRepositoryInterface
    ) {}
    
    async execute(payload?: AddUserAchievementsPort): Promise<void> {
        const { userId, score } = payload;

        const userMetrics: UserMetrics = await this.userMetricsRepository.findByUserId(userId);
        const viableAchievementsIds: number[] = await this.checkViableAchievementsService.execute({
            score: score,
            userMetrics: userMetrics
        });

        const userAchievements: UserAchievement[] = await this.userAchievementsRepository.findAllUserAchievementsByUserId(userId);

        for (const viableAchievementId of viableAchievementsIds) {
            const alreadyAchieved = userAchievements.some(userAchievement => userAchievement.achievementId === viableAchievementId);
            if (!alreadyAchieved) {
                const newUserAchievement = new UserAchievement({
                    userId: userId,
                    achievementId: viableAchievementId
                });
                await this.userAchievementsRepository.save(newUserAchievement);
            }
        }
    }
}
