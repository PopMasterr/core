import { UploadedFileType } from "../types/file.type";

export interface CloudStorageProviderInterface {
    uploadFile(uploadedFile: UploadedFileType): Promise<any>;
    deleteFile(fileName: string): Promise<void>;
}