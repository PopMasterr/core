import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_images_on_user_id')
    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'url' })
    url: string;

    @Column({ name: 'file_name' })
    fileName: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}