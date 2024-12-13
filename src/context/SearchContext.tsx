import { createContext, useState, useContext, ReactNode} from "react";
import { Hotel } from "../types/hotel";

interface SearchContextType {
    results: Hotel[];
    setResults: (results: Hotel[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [results, setResults] = useState<Hotel[]>([]);

    return (
        <SearchContext.Provider value={{ results, setResults }}>
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
