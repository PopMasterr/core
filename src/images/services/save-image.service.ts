import { Image } from "../entities/image.entity";
import { CloudStorageProviderInterface } from "../gcp/interfaces/cloud-storage-provider.interface";
import { ImageRepositoryInterface } from "../repositories/image-repository.interface";
import { SaveImageDTO, SaveImagePort, SaveImageUseCase } from "./usecases/save-image.usecase";

export class SaveImageService implements SaveImageUseCase {
    constructor(
        private readonly imageRepository: ImageRepositoryInterface,
        private readonly cloudStorageProvider: CloudStorageProviderInterface
    ) { }

    async execute(payload?: SaveImagePort): Promise<SaveImageDTO> {
        const { userId, image } = payload;
        const fileData: any = await this.cloudStorageProvider.uploadFile(image);

        let savedImage: Image = new Image();
        savedImage.userId = userId;
        savedImage.url = fileData.publicUrl;
        savedImage.fileName = fileData.fileName;

        await this.imageRepository.save(savedImage)
        
        return { publicPhotoUrl: fileData.publicUrl };
    }
}
