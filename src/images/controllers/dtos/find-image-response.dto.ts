import { ApiProperty } from "@nestjs/swagger";

export class FindImageResponseDto {
    @ApiProperty({ type: 'string' })
    publicUrl: string;
}