export interface Amenity {
    id: number;
    name: string;
    description: string;
}

export interface Hotel {
    hotelId: number;
    hotelName: string;
    starRating: number;
    latitude: number;
    longitude: number;
    roomPrice: number;
    roomType: string;
    cityName: string;
    roomPhotoUrl: string;
    discount: number;
    amenities: Amenity[];
}

export interface FeaturedDeal {
    hotelId: number;
    originalRoomPrice: number;
    discount: number;
    finalPrice: number;
    cityName: string;
    hotelName: string;
    hotelStarRating: number;
    title: string;
    description: string;
    roomPhotoUrl: string;
}

// Types
export interface HotelDetails {
    hotelName: string;
    location: string;
    description: string;
    latitude: number;
    longitude: number;
    amenities: Amenity[];
    starRating: number;
    availableRooms: number;
    imageUrl: string;
    cityId: number;
}

export interface Amenity {
    name: string;
    description: string;
}

export interface Review {
    reviewId: number;
    customerName: string;
    rating: number;
    description: string;
}

export interface GalleryImage {
    id: number;
    url: string;
}
