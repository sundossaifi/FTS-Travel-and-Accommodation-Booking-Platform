import FiltersSection from "../FiltersSection";
import HotelCard from "../HotelCard";
import { Grid2 } from "@mui/material";
import { Hotel } from "../../types/hotel";
import styles from "./SearchResults.module.css";
import { useState } from "react";

interface SearchResultsProps {
    results: Hotel[];
}

export default function SearchResults({ results }: SearchResultsProps) {
    const [filteredResults, setFilteredResults] = useState<Hotel[]>(results);

    function handleFilterChange(filters: { amenities: string[]; stars: number[]; roomTypes: string[] }) {
        const { amenities, stars, roomTypes } = filters;

        const filtered = results.filter((hotel) => {
            const matchesAmenities = amenities.length
                ? amenities.every((amenity) =>
                    hotel.amenities.some((hotelAmenity) => hotelAmenity.name === amenity)
                )
                : true;
            const matchesStars = stars.length ? stars.includes(hotel.starRating) : true;

            const matchesRoomType = roomTypes.length ? roomTypes.includes(hotel.roomType) : true;

            return matchesAmenities && matchesStars && matchesRoomType;
        });

        setFilteredResults(filtered);
    }

    return (
        <div className={styles.searchResultsContainer}>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columnSpacing={{ sm: 30 }}>
                <Grid2 size={{ xs: 12, md: 3 }} sx={{ display: { xs: "none", md: "flex" } }}>
                    <FiltersSection onFilterChange={handleFilterChange} />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 9 }}>
                    <div className={styles.hotelCardsContainer}>
                        {filteredResults && filteredResults.length > 0 ? (
                            filteredResults.map((hotel) => <HotelCard key={hotel.hotelId} hotel={hotel} />)
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </Grid2>
            </Grid2>
        </div>
    );
}