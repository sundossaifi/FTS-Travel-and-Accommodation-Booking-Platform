import { useLocation } from "react-router-dom";
import { Hotel } from "../../types/hotel";
import Navbar from "../../components/Navbar";
import SearchBox from "../../components/SearchBox";
import styles from "./Search.module.css";
import FiltersSection from "../../components/FiltersSection";
import HotelCard from "../../components/HotelCard";

export default function Search() {
    const location = useLocation();
    const { results } = location.state || { results: [] };

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
                <div style={{ padding: "16px", display: "flex", gap: "16px", justifyContent: "center",alignItems:"flex-start", width: "90%" }}>
                    <FiltersSection />
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px",}}>
                        {results.length > 0 ? (
                            results.map((hotel: Hotel) => <HotelCard key={hotel.hotelId} hotel={hotel} />)
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}
