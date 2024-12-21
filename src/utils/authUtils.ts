import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
    user_id: string;
    given_name: string;
    family_name: string;
    userType: string;
    nbf: number;
    exp: number;
    iss: string;
}

export function decodeToken(token: string): DecodedToken | null {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error("Failed to decode JWT token:", error);
        return null;
    }
}


export function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000); 
        return decoded.exp < currentTime; 
    } catch (error) {
        console.error("Failed to decode token:", error);
        return true; 
    }
}
