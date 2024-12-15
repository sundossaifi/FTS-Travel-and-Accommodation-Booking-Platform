import { Room } from "../types/room";
import { BASE_URL } from "./config";
import { HotelDetails, Review, GalleryImage } from "../types/hotel";


//Fetch available rooms for a hotel
export async function fetchAvailableRooms(
    hotelId: string,
    checkInDate: string,
    checkOutDate: string
): Promise<Room[]> {
    if (!hotelId || typeof hotelId !== "string" || hotelId.trim() === "") {
        throw new Error("Invalid hotel ID. Must be a non-empty string.");
    }

    const url = `${BASE_URL}/api/hotels/${hotelId}/available-rooms?checkInDate=${checkInDate}&CheckOutDate=${checkOutDate}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch available rooms: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching available rooms:", error);
        throw error;
    }
}


//Fetch hotel details
export async function fetchHotelDetails(
    hotelId: string,
    includeRooms: boolean = false
): Promise<HotelDetails> {
    if (!hotelId || typeof hotelId !== "string" || hotelId.trim() === "") {
        throw new Error("Invalid hotel ID. Must be a non-empty string.");
    }

    const url = `${BASE_URL}/api/hotels/${hotelId}?includeRooms=${includeRooms}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch hotel details: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching hotel details:", error);
        throw error;
    }
}


//Fetch reviews for a hotel
export async function fetchHotelReviews(hotelId: string): Promise<Review[]> {
    if (!hotelId || typeof hotelId !== "string" || hotelId.trim() === "") {
        throw new Error("Invalid hotel ID. Must be a non-empty string.");
    }

    const url = `${BASE_URL}/api/hotels/${hotelId}/reviews`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch hotel reviews: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching hotel reviews:", error);
        throw error;
    }
}


//Fetch gallery images for a hotel 
export async function fetchHotelGallery(hotelId: string): Promise<GalleryImage[]> {
    if (!hotelId || typeof hotelId !== "string" || hotelId.trim() === "") {
        throw new Error("Invalid hotel ID. Must be a non-empty string.");
    }

    const url = `${BASE_URL}/api/hotels/${hotelId}/gallery`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch hotel gallery: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching hotel gallery:", error);
        throw error;
    }
}
