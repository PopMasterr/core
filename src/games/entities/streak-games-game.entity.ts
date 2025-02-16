import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateStreakGamesGamePayload, TerritorySide } from "./types/create-streak-games-game-payload.type";

@Entity('streak_games_games')
export class StreakGamesGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_streak_games_games_on_streak_game_id')
    @Column({ name: 'streak_game_id' })
    streakGameId: number;

    @Column({ name: 'gameId' })
    gameId: number;

    @Column({ name: 'is_blue', type: 'enum', enum: TerritorySide })
    territorySide: TerritorySide;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor (payload?: CreateStreakGamesGamePayload) {
        this.streakGameId = payload?.streakGameId;
        this.gameId = payload?.gameId;
        this.territorySide = payload?.territorySide;
    }
}