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

export async function updateHotel(hotelId: number, data: Partial<Hotel>): Promise<void> {
    const url = `${BASE_URL}/api/hotels/${hotelId}`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json-patch+json",
            "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to update hotel");
    }
}