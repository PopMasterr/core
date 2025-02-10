import { Image } from "../entities/image.entity";

export interface ImageRepositoryInterface {
    save(image: Image): Promise<Image>;
    findByUserId(userId: number): Promise<Image>;
    deleteByUserId(userId: number): Promise<void>; 
}