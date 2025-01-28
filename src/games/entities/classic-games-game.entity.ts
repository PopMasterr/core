import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateClassicGamesGamePayload } from "./types/create-classic-games-game-payload.type";

@Entity('classic_games_games')
export class ClassicGamesGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_classic_games_games_on_classic_game_id')
    @Column({ name: 'classic_game_id' })
    classicGameId: number;

    @Column({ name: 'gameId' })
    gameId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor (payload?: CreateClassicGamesGamePayload) {
        this.classicGameId = payload?.classicGameId;
        this.gameId = payload?.gameId;
    }
}