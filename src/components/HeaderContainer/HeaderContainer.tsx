import Navbar from '../Navbar';
import Header from '../Header/Header';
import styles from './HeaderContainer.module.css';
import SearchBox from '../SearchBox';

export default function HeaderContainer() {
    return (
        <header className={styles.headerContainer}>
            <Navbar />
            <Header />
            <SearchBox/>
        </header>
    );
}
