import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Generated } from "typeorm";
import { MultiplayerGamesGame } from "./multiplayer-games-game.entity";

@Entity('multiplayer_games')
export class MultiplayerGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'unique_string' })
    @Generated('uuid')
    uniqueString: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => MultiplayerGamesGame, mg => mg.multiplayerGame)
    multiplayerGamesGame: MultiplayerGamesGame[];
}