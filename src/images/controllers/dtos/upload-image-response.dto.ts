import { ApiProperty } from "@nestjs/swagger";

export class UploadImageResponseDto {
    @ApiProperty({ type: 'string' })
    publicPhotoUrl: string;
}
