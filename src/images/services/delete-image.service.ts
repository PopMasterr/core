import { CloudStorageProviderInterface } from "../gcp/interfaces/cloud-storage-provider.interface";
import { ImageRepositoryInterface } from "../repositories/image-repository.interface";
import { DeleteImagePort, DeleteImageUseCase } from "./usecases/delete-image.usecase";

export class DeleteImageService implements DeleteImageUseCase {
    constructor(
        private readonly imageRepository: ImageRepositoryInterface,
        private readonly cloudStorageProvider: CloudStorageProviderInterface
    ) { }

    async execute(payload?: DeleteImagePort): Promise<void> {
        const { userId } = payload;

        const savedImage = await this.imageRepository.findByUserId(userId);
        if (!savedImage) return;

        await this.imageRepository.deleteByUserId(userId);
        await this.cloudStorageProvider.deleteFile(savedImage.fileName);
    }
}
