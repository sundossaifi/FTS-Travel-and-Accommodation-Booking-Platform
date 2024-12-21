export interface AuthResponse {
    userType: "User" | "Admin";
    authentication: string;
}