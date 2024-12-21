import CheckoutForm from "../../components/CheckoutForm";
import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader";

export default function Checkout() {
    return (
        <Box>
            <DetailsHeader title={"Checkout"} />
            <CheckoutForm />
            <Footer />
        </Box>
    );
}
