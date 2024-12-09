import Navbar from '../Navbar';
import Header from '../Header/Header';
import SearchBox from '../SearchBox';
import styles from './HeaderContainer.module.css';

export default function HeaderContainer() {
    return (
        <header className={styles.headerContainer}>
            <Navbar />
            <Header />
            <SearchBox />
        </header>
    );
}
