import Navbar from "../../components/Navbar";
import SearchBox from "../../components/SearchBox";
import SearchResults from "../../components/SearchResults";
import styles from "./Search.module.css";

export default function Search() {
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
                <SearchResults /> 
            </div>
        </div>
    );
}
