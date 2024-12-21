import { BASE_URL } from "./config";
import { BookingDetails, BookingRequest, } from "../types/booking";

export async function createBooking(bookingData: BookingRequest): Promise<BookingDetails> {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    const response = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json-patch+json",
            "Accept": "*/*",
            "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking. Unauthorized or invalid data.");
    }

    return response.json();
}

export async function getBookingById(bookingId: number): Promise<BookingDetails> {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Unauthorized: No authentication token found.");
    }

    const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}`, {
        method: "GET",
        headers: {
            "Accept": "text/plain",
            "Authorization": `Bearer ${authToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch booking details. Unauthorized or invalid ID.");
    }

    return response.json();
}
