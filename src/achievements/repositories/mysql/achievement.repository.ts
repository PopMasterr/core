import { Achievement } from "src/achievements/entities/achievement.entity";
import { AchievementRepositoryInterface } from "../achievement-repository.interface";
import { Repository } from "typeorm";

export class AchievementRepository implements AchievementRepositoryInterface {
    constructor(private readonly repository: Repository<Achievement>) {}
    
    async save(achievement: Achievement): Promise<void> {
        await this.repository.save(achievement);
    }

    async findById(id: number): Promise<Achievement> {
        return await this.repository.findOne({ where: {id: id} })
    }
}
