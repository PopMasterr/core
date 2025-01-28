import { Column, CreateDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateGamePayload } from "./types/create-game-payload.type";

@Entity('games')
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'population' })
    population: number;

    @Column({ name: 'x1' })
    x1: number;

    @Column({ name: 'y1' })
    y1: number;

    @Column({ name: 'x2' })
    x2: number;

    @Column({ name: 'y2' })
    y2: number;

    @Column({ name: 'score', nullable: true, default: 0 })
    score: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(payload?: CreateGamePayload) {
        this.population = payload?.population;
        this.x1 = payload?.x1;
        this.x2 = payload?.x2;
        this.y1 = payload?.y1;
        this.y2 = payload?.y2;
    }
}