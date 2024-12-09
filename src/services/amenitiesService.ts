import { BASE_URL } from "./config";
import { Amenity } from "../types/amenities";

export async function getAmenities(): Promise<Amenity[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/search-results/amenities`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch amenities:", error);
        throw error;
    }
}
