import FeaturedDeals from '../../components/FeaturedDeals';
import TrendingDestinations from '../../components/TrendingDestinations';
import HeaderContainer from '../../components/HeaderContainer';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    useEffect(() => {
        console.log("Location:", location.pathname);
    }, [location.pathname]);

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

