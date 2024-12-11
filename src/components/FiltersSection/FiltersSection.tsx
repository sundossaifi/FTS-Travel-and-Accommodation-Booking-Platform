import { useEffect, useState } from "react";
import FilterCard from "../FilterCard";
import { getAmenities } from "../../services/amenitiesService";

interface FiltersSectionProps {
    onFilterChange: (filters: { amenities: string[]; stars: number[]; roomTypes: string[] }) => void;
}

export default function FiltersSection({ onFilterChange }: FiltersSectionProps) {
    const [amenities, setAmenities] = useState<{ label: string; value: string }[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedStars, setSelectedStars] = useState<number[]>([]);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
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

    useEffect(() => {
        onFilterChange({ amenities: selectedAmenities, stars: selectedStars, roomTypes: selectedRoomTypes });
    }, [selectedAmenities, selectedStars, selectedRoomTypes, onFilterChange]);

    return (
        <div>
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
        </div>
    );
}
