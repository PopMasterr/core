import { Achievement } from "src/achievements/entities/achievement.entity";
import { AchievementRepositoryInterface } from "../achievement-repository.interface";
import { Repository } from "typeorm";
import { allAchievements } from "src/achievements/jsonRules";

export class AchievementRepository implements AchievementRepositoryInterface {
    constructor(private readonly repository: Repository<Achievement>) {}
    
    saveEntity(achievement: Achievement): Promise<Achievement> {
        return this.repository.save(achievement);
    }
    
    async createAchievements(achievements: Achievement[]): Promise<Boolean> {
        for (let i = 0; i < achievements.length; i++) {
            await this.createAchievement(achievements[i]);
        }

        return true;
    }
    
    createAchievement(achievement: Achievement): Promise<Achievement> {
        return this.repository.save(achievement);
    }
}
