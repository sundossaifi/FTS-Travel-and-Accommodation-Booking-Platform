import { BASE_URL } from "./config";
import { Hotel, FeaturedDeal, } from "../types/hotel";
import { TrendingDestination } from "../types/destination";
import { RecentHotel } from "../types/hotel";

// Function to search hotels
export async function searchHotels({
    checkInDate,
    checkOutDate,
    city,
    starRate,
    sort,
    numberOfRooms = 1,
    adults = 2,
    children = 0,
}: {
    checkInDate: string;
    checkOutDate: string;
    city?: string;
    starRate?: number;
    sort?: string;
    numberOfRooms?: number;
    adults?: number;
    children?: number;
}): Promise<Hotel[]> {
    try {
        const params = new URLSearchParams({
            checkInDate,
            checkOutDate,
            ...(city && { city }),
            ...(starRate !== undefined && { starRate: starRate.toString() }),
            ...(sort && { sort }),
            numberOfRooms: numberOfRooms.toString(),
            adults: adults.toString(),
            children: children.toString(),
        });

        const response = await fetch(`${BASE_URL}/api/home/search?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch hotels:", error);
        throw error;
    }
}

// Function to get featured deals
export async function getFeaturedDeals(): Promise<FeaturedDeal[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/home/featured-deals`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch featured deals:", error);
        throw error;
    }
}

// Function to get trending destinations
export async function getTrendingDestinations(): Promise<TrendingDestination[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/home/destinations/trending`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch trending destinations:", error);
        throw error;
    }
}

//Function to get recent hotels
export async function getRecentHotels(userId: number): Promise<RecentHotel[]> {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    try {
        const response = await fetch(`${BASE_URL}/api/home/users/${userId}/recent-hotels`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch recent hotels:", error);
        throw error;
    }
}


