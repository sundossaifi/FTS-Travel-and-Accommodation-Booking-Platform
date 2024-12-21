import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById } from "../../services/bookingService";
import { BookingDetails } from "../../types/booking";
import {
    Typography,
    CircularProgress,
    Paper,
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
        <Paper
            sx={{
                maxWidth: 600,
                margin: "auto",
                padding: 4,
                mt: 4,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Booking Confirmation
            </Typography>
            <Box mt={2}>
                <Typography>
                    <strong>Customer Name:</strong> {bookingDetails.customerName}
                </Typography>
                <Typography>
                    <strong>Hotel Name:</strong> {bookingDetails.hotelName}
                </Typography>
                <Typography>
                    <strong>Room Number:</strong> {bookingDetails.roomNumber}
                </Typography>
                <Typography>
                    <strong>Room Type:</strong> {bookingDetails.roomType}
                </Typography>
                <Typography>
                    <strong>Booking Date:</strong>{" "}
                    {new Date(bookingDetails.bookingDateTime).toLocaleString()}
                </Typography>
                <Typography>
                    <strong>Total Cost:</strong> ${bookingDetails.totalCost}
                </Typography>
                <Typography>
                    <strong>Payment Method:</strong> {bookingDetails.paymentMethod}
                </Typography>
                <Typography>
                    <strong>Booking Status:</strong> {bookingDetails.bookingStatus}
                </Typography>
                <Typography>
                    <strong>Confirmation Number:</strong>{" "}
                    {bookingDetails.confirmationNumber}
                </Typography>
            </Box>
        </Paper>
    );
}
