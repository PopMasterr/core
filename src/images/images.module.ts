import { Module, Provider } from "@nestjs/common";
import { ImagesDiTokens } from "./di/images-tokens.di";
import { CloudStorage } from "./gcp/cloud-storage.provider";
import { DataSource, Repository } from "typeorm";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { ImageRepository } from "./repositories/mysql/image.repostiory";
import { Image } from "./entities/image.entity";
import { ImageRepositoryInterface } from "./repositories/image-repository.interface";
import { CloudStorageProviderInterface } from "./gcp/interfaces/cloud-storage-provider.interface";
import { SaveImageService } from "./services/save-image.service";
import { ImagesController } from "./controllers/images.controller";
import { DeleteImageService } from "./services/delete-image.service";
import { DeleteImageUseCase } from "./services/usecases/delete-image.usecase";
import { FindImageService } from "./services/find-image.service";

const repositoryProviders: Array<Provider> = [
    {
        provide: ImagesDiTokens.MySQLImagesRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Image),
        inject: [DatabaseDiTokens.MySQLDataSource] 
    },
    {
        provide: ImagesDiTokens.ImagesRepositoryInterface,
        useFactory: (repository: Repository<Image>) => new ImageRepository(repository),
        inject: [ImagesDiTokens.MySQLImagesRepositoryInterface]
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: ImagesDiTokens.SaveImageService,
        useFactory: (
            imagesRepository: ImageRepositoryInterface,
            cloudStorage: CloudStorageProviderInterface,
            deleteImageService: DeleteImageUseCase
        ) => new SaveImageService(imagesRepository, cloudStorage, deleteImageService),
        inject: [
            ImagesDiTokens.ImagesRepositoryInterface,
            ImagesDiTokens.CloudStorageProvider,
            ImagesDiTokens.DeleteImageService
        ]
    },
    {
        provide: ImagesDiTokens.DeleteImageService,
        useFactory: (
            imagesRepository: ImageRepositoryInterface,
            cloudStorage: CloudStorageProviderInterface
        ) => new DeleteImageService(imagesRepository, cloudStorage),
        inject: [
            ImagesDiTokens.ImagesRepositoryInterface,
            ImagesDiTokens.CloudStorageProvider
        ]
    },
    {
        provide: ImagesDiTokens.FindImageService,
        useFactory: (imagesRepository: ImageRepositoryInterface) => new FindImageService(imagesRepository),
        inject: [ImagesDiTokens.ImagesRepositoryInterface]
    }
]

const cloudProviders: Array<Provider> = [
    {
        provide: ImagesDiTokens.CloudStorageProvider,
        useFactory: () => new CloudStorage(),
    }
]

@Module({
    providers: [...repositoryProviders, ...serviceProviders, ...cloudProviders],
    controllers: [ImagesController]
})
export class ImagesModule {}