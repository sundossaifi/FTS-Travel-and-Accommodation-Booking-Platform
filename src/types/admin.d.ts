export interface Hotel {
    id: number;
    name: string;
    description: string;
    hotelType: number;
    starRating: number;
    latitude: number;
    longitude: number;
    cityId?: number;
}

export interface City {
    id: number;
    name: string;
    description: string;
}
