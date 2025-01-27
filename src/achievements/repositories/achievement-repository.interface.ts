import {Achievement} from "../entities/achievement.entity";

export interface AchievementRepositoryInterface {
    saveEntity(achievement: Achievement): Promise<Achievement>;
    createAchievements(achievements: Achievement[]): Promise<Boolean>;
    createAchievement(achievement: Achievement): Promise<Achievement>;
}