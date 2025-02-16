import { UploadedFileType } from "../types/file.type";

export type UploadFileResult = {
    publicUrl: string;
    fileName: string;
}

export interface CloudStorageProviderInterface {
    uploadFile(uploadedFile: UploadedFileType): Promise<UploadFileResult>;
    deleteFile(fileName: string): Promise<void>;
}
