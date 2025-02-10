import { UseCase } from "src/common/usecase.common";
import { UploadedFileType } from "src/images/gcp/types/file.type";

export type SaveImagePort = {
    userId: number;
    image: UploadedFileType;
}

export type SaveImageDTO = {
    publicPhotoUrl: string;
}

export interface SaveImageUseCase extends UseCase<SaveImagePort, SaveImageDTO> {}
