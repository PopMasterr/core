import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('streak_games')
export class StreakGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_classic_games_on_user_id')
    @Column({ name: 'user_id' })
    userId: number;

    @Index('idx_classic_games_on_game_id_1')
    @Column({ name: 'game_id_1' })
    gameId1: number;

    @Index('idx_classic_games_on_game_id_2')
    @Column({ name: 'game_id_2' })
    gameId2: number;

    @CreateDateColumn({ name: 'created_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}