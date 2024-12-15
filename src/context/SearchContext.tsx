import { createContext, useState, useContext, ReactNode } from "react";
import { Hotel } from "../types/hotel";

interface SearchContextType {
    results: Hotel[];
    setResults: (results: Hotel[]) => void;
    checkInDate: string | null; 
    setCheckInDate: (date: string | null) => void;
    checkOutDate: string | null;
    setCheckOutDate: (date: string | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [results, setResults] = useState<Hotel[]>([]);
    const [checkInDate, setCheckInDate] = useState<string | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<string | null>(null);

    return (
        <SearchContext.Provider
            value={{ results, setResults, checkInDate, setCheckInDate, checkOutDate, setCheckOutDate }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};
