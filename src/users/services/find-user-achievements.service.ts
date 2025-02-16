import { FindAchievementsUseCase } from "src/achievements/services/usecases/find-achievements.usecase";
import { UserAchievementsRepositoryInterface } from "../repositories/user-achievements-repository.interface";
import { FindUserAchievementsDTO, FindUserAchievementsPort, FindUserAchivemenetsUseCase } from "./usecases/find-user-achievements.usecase";
import { UserAchievement } from "../entities/user-achievements.entity";
import { Achievement } from "src/achievements/entities/achievement.entity";

export class FindUserAchievementsService implements FindUserAchivemenetsUseCase {
    constructor (
        private readonly userAchievementsRepository: UserAchievementsRepositoryInterface,
        private readonly findAchievementsService: FindAchievementsUseCase
    ) {}
    
    async execute(payload?: FindUserAchievementsPort): Promise<FindUserAchievementsDTO[]> {
        const { userId } = payload;

        const userAchievements: UserAchievement[] = await this.userAchievementsRepository.findAllUserAchievementsByUserId(userId);
        if (!userAchievements) return;
        const achievementIds: number[] = userAchievements.map(userAchievment => userAchievment.achievementId);

        const achievements: Achievement[] = await this.findAchievementsService.execute({ achievementIds: achievementIds });
        const result: FindUserAchievementsDTO[] = achievements.map(achievement => {return {
            achievementName: achievement.name,
            achievementDescription: achievement.description
        }})

        return result;
    }
}
