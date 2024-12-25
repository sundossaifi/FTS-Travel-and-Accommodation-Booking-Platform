import { BASE_URL } from "./config";

export interface Hotel {
    id: number;
    name: string;
    description: string;
    hotelType: number;
    starRating: number;
    latitude: number;
    longitude: number;
}

export async function fetchHotels(name?: string, searchQuery?: string, pageSize: number = 10, pageNumber: number = 1): Promise<Hotel[]> {
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (searchQuery) params.append("searchQuery", searchQuery);
    params.append("pageSize", pageSize.toString());
    params.append("pageNumber", pageNumber.toString());

    const url = `${BASE_URL}/api/hotels?${params.toString()}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch hotels: ${response.statusText}`);
        }

        const data: Hotel[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}