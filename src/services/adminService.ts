import { BASE_URL } from "./config";
import { Hotel, City } from "../types/admin";
import { Room } from "../types/room";

export async function fetchHotels(
    name?: string,
    searchQuery?: string,
    pageSize: number = 10,
    pageNumber: number = 1
): Promise<Hotel[]> {
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

export async function fetchCities(): Promise<City[]> {
    const url = `${BASE_URL}/api/cities`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cities: ${response.statusText}`);
        }

        const data: City[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addHotelToCity(cityId: number, hotelData: Omit<Hotel, "id">): Promise<void> {
    const url = `${BASE_URL}/api/cities/${cityId}/hotels`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(hotelData),
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }
}

export async function fetchHotelsByCity(cityId: number): Promise<Hotel[]> {
    const url = `${BASE_URL}/api/cities/${cityId}/hotels`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch hotels for city ${cityId}: ${response.statusText}`);
        }

        const data: Hotel[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteHotel(cityId: number, hotelId: number): Promise<void> {
    const url = `${BASE_URL}/api/cities/${cityId}/hotels/${hotelId}`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete hotel");
    }
}

export async function fetchRooms(
    hotelId: number,
    checkInDate: string = "2025-1-15",
    checkOutDate: string = "2025-1-16"
): Promise<Room[]> {
    const url = `${BASE_URL}/api/hotels/${hotelId}/rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch rooms: ${response.status} ${response.statusText}`
            );
        }

        const data: Room[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
}

export async function addRoomToHotel(hotelId: number, roomData: { roomNumber: string; cost: number }): Promise<void> {
    const url = `${BASE_URL}/api/hotels/${hotelId}/rooms`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(roomData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add room: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error adding room:", error);
        throw error;
    }
}

export async function updateRoom(roomId: number, roomData: { roomNumber: string; cost: number }): Promise<void> {
    const url = `${BASE_URL}/api/rooms/${roomId}`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(roomData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update room: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error updating room:", error);
        throw error;
    }
}

export async function fetchCitiesList(
    pageSize: number = 10,
    pageNumber: number = 1
): Promise<City[]> {
    const url = `${BASE_URL}/api/cities?pageSize=${pageSize}&pageNumber=${pageNumber}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cities: ${response.statusText}`);
        }

        const data: City[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addCity(data: { name: string; description: string }): Promise<void> {
    const url = `${BASE_URL}/api/cities`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to add city: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error adding city:", error);
        throw error;
    }
}

export async function fetchCityDetails(cityId: number): Promise<{ id: number; name: string; description: string }> {
    const url = `${BASE_URL}/api/cities/${cityId}?includeHotels=false`;

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch city details: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching city details:", error);
        throw error;
    }
}

export async function updateCity(cityId: number, data: { name: string; description: string }): Promise<void> {
    const url = `${BASE_URL}/api/cities/${cityId}`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to update city: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error updating city:", error);
        throw error;
    }
}

export async function deleteCity(cityId: number): Promise<void> {
    const url = `${BASE_URL}/api/cities/${cityId}`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete city: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error deleting city:", error);
        throw error;
    }
}

export async function deleteRoom(hotelId: number, roomId: number): Promise<void> {
    const url = `${BASE_URL}/api/hotels/${hotelId}/rooms/${roomId}`;
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete room. Status: ${response.status}, Message: ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error deleting room:", error);
        throw error;
    }
}