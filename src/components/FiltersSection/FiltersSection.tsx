import { useEffect, useState } from "react";
import FilterCard from "../FilterCard";
import { getAmenities } from "../../services/amenitiesService";

export default function FiltersSection() {
    const [amenities, setAmenities] = useState<{ label: string; value: string }[]>([]);
    const [starRatings] = useState([5, 4, 3, 2, 1].map((rating) => ({ label: "", value: rating })));
    const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

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

    function handleAmenityChange(selectedValues: string[]) {
        console.log("Selected Amenities:", selectedValues);
    }

    function handleStarChange(selectedValues: number[]) {
        console.log("Selected Star Ratings:", selectedValues);
    }

    function handleRoomTypeChange(selectedValues: string[]) {
        setSelectedRoomTypes(selectedValues);
        console.log("Selected Room Types:", selectedValues);
    }

    return (
        <div>
            <FilterCard<string>
                title="Amenities"
                items={amenities}
                onChange={handleAmenityChange}
            />
            <FilterCard<number>
                title="Hotel Star"
                items={starRatings}
                isStarFilter={true}
                onChange={handleStarChange}
            />
            <FilterCard<string>
                title="Room Type"
                items={roomTypes}
                onChange={handleRoomTypeChange}
            />
        </div>
    );
}
