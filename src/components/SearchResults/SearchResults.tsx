import FiltersSection from "../FiltersSection";
import HotelCard from "../HotelCard";
import { Grid2 } from "@mui/material";
import { Hotel } from "../../types/hotel";
import styles from "./SearchResults.module.css";

interface SearchResultsProps {
    results: Hotel[];
    onFiltersChange: (filters: { amenities: string[]; stars: number[]; roomTypes: string[] }) => void;
}

export default function SearchResults({ results, onFiltersChange }: SearchResultsProps) {
    return (
        <div className={styles.searchResultsContainer}>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columnSpacing={{ sm: 30 }}>
                <Grid2 size={{ xs: 12, md: 3 }} sx={{ display: { xs: "none", md: "flex" } }}>
                    <FiltersSection onFiltersChange={onFiltersChange} />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 9 }}>
                    <div className={styles.hotelCardsContainer}>
                        {results && results.length > 0 ? (
                            results.map((hotel: Hotel) => (
                                <HotelCard key={hotel.hotelId} hotel={hotel} />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </Grid2>
            </Grid2>
        </div>
    );
}
