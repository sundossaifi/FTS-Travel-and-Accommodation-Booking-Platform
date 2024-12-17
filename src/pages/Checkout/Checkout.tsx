import CheckoutForm from "../../components/CheckoutForm";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./Checkout.module.css"

export default function Checkout() {
    return (
        <Box>
            <div>
                <Navbar />
                <div className={styles.headerContainer}>
                    <Typography variant="h4" sx={{
                        position: "absolute",
                        bottom: "10%",
                        left: "10%",
                        color: "#fff"
                    }}>
                        Checkout
                    </Typography>
                </div>
            </div>
            <CheckoutForm />
            <Footer/>
        </Box>
    );
}
