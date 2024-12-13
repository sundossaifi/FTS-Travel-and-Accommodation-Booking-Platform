import FiltersSection from "../FiltersSection";
import HotelCard from "../HotelCard";
import { Box, Button, Grid2, Modal, Menu, MenuItem, Typography } from "@mui/material";
import { Hotel } from "../../types/hotel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Import the dropdown arrow icon
import styles from "./SearchResults.module.css";
import { useCallback, useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export default function SearchResults() {
    const { results } = useSearch();
    const [filteredResults, setFilteredResults] = useState<Hotel[]>(results);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        setIsSortMenuOpen(true);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        setIsSortMenuOpen(false);
    }

    function sortByPriceLowToHigh() {
        const sorted = [...results].sort((a, b) => a.roomPrice - b.roomPrice);
        setFilteredResults(sorted);
        handleMenuClose();
    }

    function sortByPriceHighToLow() {
        const sorted = [...results].sort((a, b) => b.roomPrice - a.roomPrice);
        setFilteredResults(sorted);
        handleMenuClose();
    }

    function sortByNameAZ() {
        const sorted = [...results].sort((a, b) => a.hotelName.localeCompare(b.hotelName));
        setFilteredResults(sorted);
        handleMenuClose();
    }

    function sortByNameZA() {
        const sorted = [...results].sort((a, b) => b.hotelName.localeCompare(a.hotelName));
        setFilteredResults(sorted);
        handleMenuClose();
    }

    useEffect(() => {
        setFilteredResults(results);
    }, [results]);

    const handleFilterChange = useCallback(
        (filters: {
            amenities: string[];
            stars: number[];
            roomTypes: string[];
            priceRange: [number, number];
        }) => {
            const { amenities, stars, roomTypes, priceRange } = filters;

            const filtered = results.filter((hotel) => {
                const matchesAmenities = amenities.length
                    ? amenities.every((amenity) =>
                        hotel.amenities.some((hotelAmenity) => hotelAmenity.name === amenity)
                    )
                    : true;

                const matchesStars = stars.length ? stars.includes(hotel.starRating) : true;

                const matchesRoomType = roomTypes.length ? roomTypes.includes(hotel.roomType) : true;

                const matchesPrice =
                    hotel.roomPrice >= priceRange[0] && hotel.roomPrice <= priceRange[1];

                return matchesAmenities && matchesStars && matchesRoomType && matchesPrice;
            });

            setFilteredResults(filtered);
            setIsFiltersOpen(false);
        },
        [results]
    );

    return (
        <div className={styles.searchResultsContainer}>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columnSpacing={{ sm: 30 }}>
                <Grid2 size={{ xs: 12, md: 3 }} sx={{ display: { xs: "none", md: "flex" } }}>
                    <FiltersSection onFilterChange={handleFilterChange} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 9 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "2rem",
                            width: "100%",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setIsFiltersOpen(true)}
                            sx={{
                                display: { xs: "flex", md: "none" },
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "20px",
                                border: "1px solid #E0E0E0",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                padding: "8px 16px",
                                fontSize: "14px",
                                textTransform: "none",
                                color: "#333",
                                backgroundColor: "white",
                                "&:hover": {
                                    backgroundColor: "#F5F5F5",
                                    border: "1px solid #D6D6D6",
                                },
                            }}
                            startIcon={<FilterAltOutlinedIcon style={{ fontSize: "18px", color: "#333" }} />}
                        >
                            Filters
                        </Button>

                        <Button
                            variant="text"
                            onClick={handleMenuOpen}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "none",
                                color: "#333",
                                fontSize: "16px",
                                padding: "0",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#333" }}>
                                Sort by
                            </Typography>
                            <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} />
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            open={isSortMenuOpen}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            <MenuItem onClick={sortByPriceLowToHigh}>
                                Price: Low to High
                            </MenuItem>
                            <MenuItem onClick={sortByPriceHighToLow}>
                                Price: High to Low
                            </MenuItem>
                            <MenuItem onClick={sortByNameAZ}>
                                Name: A - Z
                            </MenuItem>
                            <MenuItem onClick={sortByNameZA}>
                                Name: Z - A
                            </MenuItem>
                        </Menu>
                    </Box>

                    <div className={styles.hotelCardsContainer}>
                        {filteredResults && filteredResults.length > 0 ? (
                            filteredResults.map((hotel) => (
                                <HotelCard key={hotel.hotelId} hotel={hotel} />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </Grid2>
            </Grid2>

            <Modal
                open={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
            >
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: 400,
                        bgcolor: "background.paper",
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 24,
                        margin: "auto",
                        mt: "10vh",
                        maxHeight: "80vh",
                        overflowY: "auto",
                    }}
                >
                    <FiltersSection
                        onFilterChange={(filters) => {
                            handleFilterChange(filters);
                        }}
                    />
                </Box>
            </Modal>
        </div>
    );
}
