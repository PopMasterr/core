import { UserAchievement } from "../entities/user-achievements.entity";

export interface UserAchievementsRepositoryInterface {
    findAllUserAchievementsByUserId(userId: number): Promise<UserAchievement[]>;
    save(userAchievement: UserAchievement): Promise<void>;
}