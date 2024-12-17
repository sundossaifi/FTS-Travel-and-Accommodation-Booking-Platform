import { BASE_URL } from "./config";
import { BookingDetails,BookingRequest,BookingResponse } from "../types/booking";

export async function createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
    const response = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json-patch+json",
            "Accept": "*/*",

            // "Authorization": `Bearer `,
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking. Unauthorized or invalid data.");
    }

    return response.json();
}

export async function getBookingById(bookingId: number): Promise<BookingDetails> {
    const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}`, {
        method: "GET",
        headers: {
            "Accept": "text/plain",
            "Authorization": `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch booking details. Unauthorized or invalid ID.");
    }

    return response.json();
}
