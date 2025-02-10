import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('streak_games')
export class StreakGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_classic_games_on_user_id')
    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'streak', nullable: true, default: 0 })
    streak: number;

    @Column({ name: 'is_lost', nullable: true, default: 0 })
    isLost: Boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}