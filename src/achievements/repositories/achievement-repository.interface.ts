import {Achievement} from "../entities/achievement.entity";

export interface AchievementRepositoryInterface {
    save(achievement: Achievement): Promise<void>;
    findById(id: number): Promise<Achievement>
}
