import { DeleteImageUseCase } from "./usecases/delete-image.usecase";
import { SaveImagePort, SaveImageDTO, SaveImageUseCase } from "./usecases/save-image.usecase";
import { UpdateImageUseCase } from "./usecases/update-image.usecase";

// TODO:Combine save and create services
export class UpdateImageService implements UpdateImageUseCase {
    constructor (
        private readonly saveImageService: SaveImageUseCase,
        private readonly deleteImageService: DeleteImageUseCase
    ) {}

    // TODO: Create separate port for this usecase
    async execute(payload?: SaveImagePort): Promise<SaveImageDTO> {
        const { userId } = payload;

        await this.deleteImageService.execute({ userId: userId });
        const savedImage: SaveImageDTO = await this.saveImageService.execute(payload);

        return savedImage
    }
}
