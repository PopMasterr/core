import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_metrics')
export class UserMetrics {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_user_metrics_on_user_id')
    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'total_points' })
    totalPoints: number;

    @Column({ name: 'games_played' })
    gamesPlayed: number;

    @Column({ name: 'perfect_guesses' })
    perfectGuesses: number;

    @Column({ name: 'highest_streak' })
    highestStreak: number;

    @CreateDateColumn({ name: 'created_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor (userId: number) {
        this.userId = userId;
        this.totalPoints = 0;
        this.gamesPlayed = 0;
        this.perfectGuesses = 0;
        this.highestStreak = 0;
    }
}
