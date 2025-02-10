import { Image } from "src/images/entities/image.entity";
import { ImageRepositoryInterface } from "../image-repository.interface";
import { Repository } from "typeorm";

export class ImageRepository implements ImageRepositoryInterface {
    constructor(
        private readonly repository: Repository<Image>
    ) { }

    async save(image: Image): Promise<Image> {
        return await this.repository.save(image);
    }

    async findByUserId(userId: number): Promise<Image> {
        return await this.repository.findOne({ where: { userId: userId } });
    }

    async deleteByUserId(userId: number): Promise<void> {
        await this.repository.delete({ userId: userId });
    }
}
