import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'email' })
    email: string;
    
    @Column({ name: 'password' })
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
