import { Grid2, Box, Typography } from "@mui/material";
import { TrendingDestination } from "../../types/destination";
import { useState, useEffect } from "react";
import { getTrendingDestinations } from "../../services/homeService";
import styles from "./TrendingDestinations.module.css";
import TrendingDestinationCard from "../TrendingDestinationCard";

export default function TrendingDestinations() {
    const [destinations, setDestinations] = useState<TrendingDestination[]>([]);

    useEffect(() => {
        async function fetchDestinations() {
            try {
                const data = await getTrendingDestinations();
                setDestinations(data);
            } catch (error) {
                console.error("Failed to fetch trending destinations:", error);
            }
        };

        fetchDestinations();
    }, [])

    return (
        <section className={styles.trendingDestinationsContainer} >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography variant="h2" gutterBottom sx={{
                    color: "#174b71",
                    fontSize: { md: "50px", xs: "22px" },
                    marginBottom: '30px'
                }}>
                    Trending Destinations
                </Typography>
                <Grid2 container spacing={{ xs: 2, sm: 10, md: 3 }} columnSpacing={{ xs: 2, sm: 10, md: 15 }} alignItems={'center'}>
                    {destinations.map((destination) => (
                        <Grid2 key={destination.cityId} size={{ xs: 12, sm: 6, md: 4 }}>
                            <TrendingDestinationCard
                                cityName={destination.cityName}
                                thumbnailUrl={destination.thumbnailUrl}
                                countryName={destination.countryName}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </section>
    )
}