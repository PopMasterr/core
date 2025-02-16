import { UserAchievement } from "src/users/entities/user-achievements.entity";
import { UserAchievementsRepositoryInterface } from "../user-achievements-repository.interface";
import { Repository } from "typeorm";

export class UserAchievementsRepository implements UserAchievementsRepositoryInterface {
    constructor (
        private readonly repository: Repository<UserAchievement>
    ) {}
    
    async findAllUserAchievementsByUserId(userId: number): Promise<UserAchievement[]> {
        return await this.repository.find({ where: { userId: userId } })
    }

    async save(userAchievement: UserAchievement): Promise<void> {
       await this.repository.save(userAchievement);
    }
}
