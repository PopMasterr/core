import { Bucket, Storage } from "@google-cloud/storage";
import { parse } from "path";
import { v4 as uuidv4 } from 'uuid';
import { UploadedFileType } from "./types/file.type";
import { BadRequestException } from "@nestjs/common";
import { CloudStorageProviderInterface } from "./interfaces/cloud-storage-provider.interface";


export class CloudStorage implements CloudStorageProviderInterface {
    private bucket: Bucket;

    constructor() {
        const serviceAccount = JSON.parse(process.env.GOOGLE_CLOUD_STORAGE_KEY as string);
        const storage = new Storage({
            credentials: serviceAccount,
            projectId: serviceAccount.project_id,
          });
        this.bucket = storage.bucket('university_project_computer_organisation');
    }
    
    // TODO: Define proper return type to inlcude publicUrl and fileName
    async uploadFile(uploadedFile: UploadedFileType): Promise<any> {
        const fileName: string = this.setFileName(uploadedFile);

        const file = this.bucket.file(fileName);

        try {
            await file.save(uploadedFile.buffer, { contentType: uploadedFile.mimetype });
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
        return { ...file.metadata, publicUrl: `https://storage.googleapis.com/${this.bucket.name}/${file.name}`, fileName: fileName };
    }

    private setFileName(uploadedFile: UploadedFileType): string {
        const uniqueId = uuidv4();
        const uploadedFileName = parse(uploadedFile.originalName).base;

        const fileName = `${uniqueId}_${uploadedFileName}`;
        return fileName;
    }

    async deleteFile(fileName: string): Promise<void> {
        const file = this.bucket.file(fileName);
        try {
            await file.delete();
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
    }

}