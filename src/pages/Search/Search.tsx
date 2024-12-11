import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SearchBox from "../../components/SearchBox";
import styles from "./Search.module.css";
import SearchResults from "../../components/SearchResults";
import { Hotel } from "../../types/hotel";

interface SearchProps {
    results: Hotel[];
}

export default function Search({ results }: SearchProps) {
    const [allHotels, setAllHotels] = useState<Hotel[]>(results);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(results);

    useEffect(() => {
        setAllHotels(results);
        setFilteredHotels(results);
    }, [results]);

    function handleFiltersChange(filters: {
        amenities: string[];
        stars: number[];
        roomTypes: string[];
    }) {
        const { amenities, stars, roomTypes } = filters;

        const filtered = allHotels.filter((hotel) => {
            const matchesAmenities =
                amenities.length === 0 || hotel.amenities.some((amenity) => amenities.includes(amenity.name));
            const matchesStars = stars.length === 0 || stars.includes(hotel.starRating);
            const matchesRoomTypes = roomTypes.length === 0 || roomTypes.includes(hotel.roomType);

            return matchesAmenities && matchesStars && matchesRoomTypes;
        });

        setFilteredHotels(filtered);
    }

    return (
        <div style={{ width: "100%" }}>
            <div>
                <Navbar />
                <div className={styles.headerContainer}>
                    <div className={styles.searchBoxContainer}>
                        <SearchBox />
                    </div>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <SearchResults
                    results={filteredHotels}
                    onFiltersChange={handleFiltersChange}
                />
            </div>
        </div>
    );
}