export type Coordinates = {
    x: number;
    y: number;
}

export type PopulationResponse = {
    population: number;
    score: number;
}

export type CoordinatesResponse = {
    coordinates1: Coordinates;
    coordinates2: Coordinates;
    pixelCoordinates1: Coordinates;
    pixelCoordinates2: Coordinates;
}
