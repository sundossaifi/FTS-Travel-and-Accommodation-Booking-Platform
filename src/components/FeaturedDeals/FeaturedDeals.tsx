import { useEffect, useState } from "react";
import { Typography, Box, Grid2 } from "@mui/material";
import styles from "./FeaturedDeals.module.css";
import RoomCard from "../RoomCard";
import { getFeaturedDeals } from "../../services/homeService";
import { FeaturedDeal } from "../../types/hotel";

export default function FeaturedDeals() {
    const [featuredDeals, setFeaturedDeals] = useState<FeaturedDeal[]>([]);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const deals = await getFeaturedDeals();
                setFeaturedDeals(deals);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDeals();
    }, []);


    return (
        <section className={styles.featuredDealsSection} id="featured">
            <Box sx={{
                width: "80%",
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography variant="h2" gutterBottom sx={{
                    color: "#174b71",
                    fontSize: { md: "50px", xs: "22px" },
                    marginBottom: '30px'
                }}>
                    Featured Deals
                </Typography>
                <Grid2 container spacing={{ xs: 2, md: 3 }} alignItems={'center'} >
                    {featuredDeals.map((deal) => (
                        <Grid2 key={deal.hotelId} size={{ xs: 12, sm: 6, md: 4 }}>
                            <RoomCard
                                originalRoomPrice={deal.originalRoomPrice}
                                finalPrice={deal.finalPrice}
                                hotelName={deal.hotelName}
                                cityName={deal.cityName}
                                roomPhotoUrl={deal.roomPhotoUrl}
                                hotelStarRating={deal.hotelStarRating}
                                discount={deal.discount}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </section>
    )
}