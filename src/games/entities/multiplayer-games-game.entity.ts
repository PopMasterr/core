import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MultiplayerGame } from "./multiplayer-game.entity";
import { MultiplayerGamesGamesScore } from "./multiplayer-games-games-score.entity";
import { CreateMultiplayerGamesGamePayload } from "./types/create-multiplayer-games-game-payload.type";

@Entity('multiplayer_games_games')
export class MultiplayerGamesGame {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MultiplayerGame, mg => mg.multiplayerGamesGame)
    multiplayerGame: MultiplayerGame;

    @Column({ name: 'game_id' })
    gameId: number;

    @Column({ name: 'round' })
    round: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => MultiplayerGamesGamesScore, score => score.multiplayerGamesGame)
    scores: MultiplayerGamesGamesScore[];

    constructor (payload?: CreateMultiplayerGamesGamePayload) {
        this.gameId = payload?.gameId;
        this.round = payload?.round;
        this.multiplayerGame = payload?.multiplayerGame;
    }
}