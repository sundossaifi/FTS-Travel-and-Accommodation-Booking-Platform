import { BASE_URL } from "./config";
import { AuthResponse } from "../types/auth";

export async function authenticateUser(
    userName: string,
    password: string
): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/api/auth/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify({ userName, password }),
    });

    if (!response.ok) {
        throw new Error("Authentication failed");
    }

    const data: AuthResponse = await response.json();
    return data;
}
