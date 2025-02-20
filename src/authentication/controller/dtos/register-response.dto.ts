import { ApiProperty } from "@nestjs/swagger";

export class RegisterResponseDto {
    @ApiProperty({ type: 'number' })
    id: number;

    @ApiProperty({ type: 'string' })
    username: string;

    @ApiProperty({ type: 'string' })
    email: string;

    @ApiProperty({ type: 'string' })
    password: string;

    @ApiProperty({ type: 'string', format: 'date-time' })
    createdAt: Date;

    @ApiProperty({ type: 'string', format: 'date-time' })
    updatedAt: Date;
}
