import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MultiplayerGamesGame } from "./multiplayer-games-game.entity";

@Entity('multplayer_games_games_scores')
export class MultiplayerGamesGamesScore {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MultiplayerGamesGame, mgGame => mgGame.scores)
    multiplayerGamesGame: MultiplayerGamesGame;

    @Column({name: 'user_id'})
    userId: number;

    @Column({name: 'score'})
    score: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
