import { useEffect, useState } from "react";
import { getRecentHotels } from "../../services/homeService";
import { RecentHotel } from "../../types/hotel";
import { decodeToken } from "../../utils/authUtils";
import styles from "./RecentHotels.module.css"
import { Box, Typography, CircularProgress, Grid2 } from "@mui/material";
import RecentHotelsCard from "../RecentHotelsCard";

export default function RecentHotels() {
    const [recentHotels, setRecentHotels] = useState<RecentHotel[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRecentHotels() {
            try {
                const authToken = localStorage.getItem("authToken");
                if (!authToken) {
                    throw new Error("User is not authenticated.");
                }

                const decodedToken = decodeToken(authToken);
                if (!decodedToken || !decodedToken.user_id) {
                    throw new Error("Invalid token. Cannot retrieve user ID.");
                }

                const hotels = await getRecentHotels(parseInt(decodedToken.user_id));
                setRecentHotels(hotels);
            } catch (err) {
                setError((err as Error).message || "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecentHotels();
    }, [recentHotels]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!recentHotels || recentHotels.length === 0) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography>No recent hotels found.</Typography>
            </Box>
        );
    }

    return (
        <section className={styles.recentHotelsSection} id="recent">
            <Box sx={{
                width: "80%",
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                mt:"4"
            }}>
                <Typography variant="h2" gutterBottom sx={{
                    color: "#174b71",
                    fontSize: { md: "50px", xs: "22px" },
                    marginBottom: '30px'
                }}>
                    Recently Visited Hotels
                </Typography>
                <Grid2 container spacing={{ xs: 2, md: 3 }} alignItems={'center'} >
                    {recentHotels.map((hotel) => (
                        <Grid2 key={hotel.hotelId} size={{ xs: 12, sm: 6, md: 4 }}>
                            <RecentHotelsCard hotel={hotel} />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </section>
    )
}
