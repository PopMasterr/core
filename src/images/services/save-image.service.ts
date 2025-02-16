import { Image } from "../entities/image.entity";
import { CloudStorageProviderInterface, UploadFileResult } from "../gcp/interfaces/cloud-storage-provider.interface";
import { ImageRepositoryInterface } from "../repositories/image-repository.interface";
import { DeleteImageUseCase } from "./usecases/delete-image.usecase";
import { SaveImageDTO, SaveImagePort, SaveImageUseCase } from "./usecases/save-image.usecase";

export class SaveImageService implements SaveImageUseCase {
    constructor(
        private readonly imageRepository: ImageRepositoryInterface,
        private readonly cloudStorageProvider: CloudStorageProviderInterface,
        private readonly deleteImageService: DeleteImageUseCase
    ) { }

    async execute(payload?: SaveImagePort): Promise<SaveImageDTO> {
        const { userId, image } = payload;
        const fileData: UploadFileResult = await this.cloudStorageProvider.uploadFile(image);

        await this.deleteImageService.execute({ userId: userId })

        let savedImage: Image = new Image();
        savedImage.userId = userId;
        savedImage.url = fileData.publicUrl;
        savedImage.fileName = fileData.fileName;

        await this.imageRepository.save(savedImage)

        return { publicPhotoUrl: fileData.publicUrl };
    }
}
