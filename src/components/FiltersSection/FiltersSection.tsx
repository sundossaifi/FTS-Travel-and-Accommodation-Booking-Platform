import { useEffect, useState } from "react";
import FilterCard from "../FilterCard";
import PriceFilterCard from "../PriceFilterCard"; // Import the new component
import { getAmenities } from "../../services/amenitiesService";
import { Button } from "@mui/material";

interface FiltersSectionProps {
    onFilterChange: (filters: { amenities: string[]; stars: number[]; roomTypes: string[]; priceRange: [number, number] }) => void;
}

export default function FiltersSection({ onFilterChange }: FiltersSectionProps) {
    const [amenities, setAmenities] = useState<{ label: string; value: string }[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedStars, setSelectedStars] = useState<number[]>([]);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000]);

    const starRatings = [5, 4, 3, 2, 1].map((rating) => ({ label: "", value: rating }));
    const roomTypes = ["Double", "King Suite", "Standard", "Cabin", "Ocean View"].map((type) => ({
        label: type,
        value: type,
    }));

    useEffect(() => {
        async function fetchAmenities() {
            try {
                const amenitiesData = await getAmenities();
                const formattedAmenities = amenitiesData.map((amenity: { name: string }) => ({
                    label: amenity.name,
                    value: amenity.name,
                }));
                setAmenities(formattedAmenities);
            } catch (error) {
                console.error("Failed to fetch amenities:", error);
            }
        }
        fetchAmenities();
    }, []);

    function applyFilters() {
        onFilterChange({
            amenities: selectedAmenities,
            stars: selectedStars,
            roomTypes: selectedRoomTypes,
            priceRange: selectedPriceRange,
        });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <PriceFilterCard onChange={setSelectedPriceRange} />
            <FilterCard<string>
                title="Amenities"
                items={amenities}
                onChange={setSelectedAmenities}
            />
            <FilterCard<number>
                title="Hotel Star"
                items={starRatings}
                isStarFilter={true}
                onChange={setSelectedStars}
            />
            <FilterCard<string>
                title="Room Type"
                items={roomTypes}
                onChange={setSelectedRoomTypes}
            />
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={applyFilters}
                sx={{
                    borderRadius: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    textTransform: "none",
                    width: "60%" ,
                    backgroundColor: "#174b71",
                }}
            >
                Apply filters
            </Button>
        </div>
    );
}
