import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById } from "../../services/bookingService";
import { BookingDetails } from "../../types/booking";
import Footer from "../../components/Footer";
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader";
import ConfirmationCard from "../../components/ConfirmationCard";
import {
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";

export default function Confirmation() {
    const { bookingId } = useParams();
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBookingDetails() {
            try {
                if (!bookingId) {
                    throw new Error("Booking ID is missing in the URL.");
                }

                const details = await getBookingById(parseInt(bookingId));
                setBookingDetails(details);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!bookingDetails) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography color="error" variant="h6">
                    No booking details found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <DetailsHeader title="Confirmation" />
            <ConfirmationCard bookingDetails={bookingDetails} />
            <Footer />
        </Box>
    );
}
