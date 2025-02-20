import { ApiProperty } from "@nestjs/swagger";

export class GameDto {
    @ApiProperty({ type: 'number', description: 'Left corner X coordinate' })
    x1: number;

    @ApiProperty({ type: 'number', description: 'Right corner X coordinate' })
    x2: number;

    @ApiProperty({ type: 'number', description: 'Left corner Y coordinate' })
    y1: number;

    @ApiProperty({ type: 'number', description: 'Rigth corner Y coordinate' })
    y2: number;
}

export class CreateClassicGameResponseDto {
    @ApiProperty({ type: 'number' })
    id: number;

    @ApiProperty({ type: GameDto })
    game: GameDto;
};
