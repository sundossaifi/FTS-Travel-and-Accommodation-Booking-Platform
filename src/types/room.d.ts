export interface Room {
    roomId: number;
    roomNumber: number;
    roomPhotoUrl: string;
    roomType: string;
    capacityOfAdults: number;
    capacityOfChildren: number;
    roomAmenities: RoomAmenity[];
    price: number;
    availability: boolean;
}

export interface RoomAmenity {
    name: string;
    description: string;
}