import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateStreakGamesGamePayload } from "./types/create-streak-games-game-payload.type";

@Entity('streak_games_games')
export class StreakGamesGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_streak_games_games_on_streak_game_id')
    @Column({ name: 'streak_game_id' })
    streakGameId: number;

    @Column({ name: 'gameId' })
    gameId: number;

    // TODO: Would be better to transform into type e.g 1 = BLUE, 2 = RED would be more scalable and wouldn't expose external details as UI color
    @Column({ name: 'is_blue' })
    isBlue: Boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor (payload?: CreateStreakGamesGamePayload) {
        this.streakGameId = payload?.streakGameId;
        this.gameId = payload?.gameId;
        this.isBlue = payload?.isBlue;
    }
}