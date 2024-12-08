import React from 'react';
import Navbar from '../../components/Navbar/NavBar.tsx';
import Header from '../../components/Header/Header.tsx';
import SearchBox from '../../components/SearchBox/SearchBox.tsx';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Header />
            <SearchBox />
        </div>
    );
}

