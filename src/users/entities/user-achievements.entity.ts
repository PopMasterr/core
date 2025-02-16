import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAChievementsPaylaod } from "./types/user-achievements-paylaod.type";

@Entity('user_achievements')
export class UserAchievement {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_user_achievements_on_user_id')
    @Column({ name: 'user_id' })
    userId: number;

    @Index('idx_user_achievements_on_achievement_id')
    @Column({ name: 'achievement_id' })
    achievementId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor (payload?: UserAChievementsPaylaod) {
        this.userId = payload?.userId;
        this.achievementId = payload?.achievementId;
    }
}
