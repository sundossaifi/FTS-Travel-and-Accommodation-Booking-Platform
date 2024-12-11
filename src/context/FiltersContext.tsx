import React, { createContext, useContext, useState } from "react";

interface FiltersContextProps {
    selectedAmenities: string[];
    setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
    selectedStars: number[];
    setSelectedStars: React.Dispatch<React.SetStateAction<number[]>>;
    selectedRoomTypes: string[];
    setSelectedRoomTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(
    undefined
);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedStars, setSelectedStars] = useState<number[]>([]);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

    return (
        <FiltersContext.Provider
            value={{
                selectedAmenities,
                setSelectedAmenities,
                selectedStars,
                setSelectedStars,
                selectedRoomTypes,
                setSelectedRoomTypes,
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = (): FiltersContextProps => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error("useFilters must be used within a FiltersProvider");
    }
    return context;
};
