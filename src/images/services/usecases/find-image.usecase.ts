import { UseCase } from "src/common/usecase.common";
import { Image } from "src/images/entities/image.entity";

export type FindImagePort = {
    userId: number;
}

export interface FindImageUseCase extends UseCase<FindImagePort, Image> {}