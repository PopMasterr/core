import { ApiProperty } from "@nestjs/swagger";

export class CreateMultiplayerGameResponseDto {
    @ApiProperty({ type: 'string' })
    uniqueString: string;
};
