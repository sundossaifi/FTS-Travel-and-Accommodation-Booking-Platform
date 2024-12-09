import FeaturedDeals from '../../components/FeaturedDeals';
import TrendingDestinations from '../../components/TrendingDestinations';
import HeaderContainer from '../../components/HeaderContainer';

export default function Home() {
    return (
        <div>
            <HeaderContainer />
            <main>
                <FeaturedDeals />
                <TrendingDestinations />
            </main>
        </div>
    );
}

