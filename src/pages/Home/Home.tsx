import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import SearchBox from '../../components/SearchBox';
import FeaturedDeals from '../../components/FeaturedDeals';
import TrendingDestinations from '../../components/TrendingDestinations';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div>
            <header className={styles.headerContainer}>
                <Navbar />
                <Header />
                <SearchBox />
            </header>
            <FeaturedDeals/>
            <TrendingDestinations/>
        </div>
    );
}

