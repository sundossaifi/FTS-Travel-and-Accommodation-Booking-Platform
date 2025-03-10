import FeaturedDeals from '../../components/FeaturedDeals';
import TrendingDestinations from '../../components/TrendingDestinations';
import RecentHotels from '../../components/RecentHotels';
import HeaderContainer from '../../components/HeaderContainer';
import Footer from '../../components/Footer';

export default function Home() {
    return (
        <div>
            <HeaderContainer />
            <main>
                <FeaturedDeals />
                <TrendingDestinations />
                <RecentHotels/>
            </main>
            <Footer />
        </div>
    );
}

