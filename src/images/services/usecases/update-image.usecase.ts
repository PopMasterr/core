import { UseCase } from "src/common/usecase.common";
import { SaveImageDTO, SaveImagePort } from "./save-image.usecase";

export interface UpdateImageUseCase extends UseCase<SaveImagePort, SaveImageDTO> {}
