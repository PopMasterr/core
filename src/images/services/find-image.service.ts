import { Image } from "../entities/image.entity";
import { ImageRepositoryInterface } from "../repositories/image-repository.interface";
import { FindImagePort, FindImageUseCase } from "./usecases/find-image.usecase";

export class FindImageService implements FindImageUseCase {
    constructor (
        private readonly imageRepository: ImageRepositoryInterface
    ) {}

    async execute(payload?: FindImagePort): Promise<Image> {
        const { userId } = payload;

        return await this.imageRepository.findByUserId(userId);
    }
}
