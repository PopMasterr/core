import { Achievement } from "../entities/achievement.entity";
import { AchievementRepositoryInterface } from "../repositories/achievement-repository.interface";
import { FindAchievementsPort, FindAchievementsUseCase } from "./usecases/find-achievements.usecase";

export class FindAchievementsService implements FindAchievementsUseCase {
    constructor(
        private readonly achievementRepository: AchievementRepositoryInterface
    ) { }

    async execute(payload?: FindAchievementsPort): Promise<Achievement[]> {
        let achievements: Achievement[] = new Array<Achievement>();
        const { achievementIds } = payload;

        for (const achievementId of achievementIds) {
            const achievement: Achievement = await this.achievementRepository.findById(achievementId);
            if (achievement) {
                achievements.push(achievement);
            }
        }

        return achievements;
    }
}
