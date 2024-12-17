import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/bookingService";
import { Box, Typography,  Paper } from "@mui/material";

export default function Confirmation() {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [bookingDetails, setBookingDetails] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBookingDetails() {
            try {
                const data = await getBookingById(Number(bookingId));
                setBookingDetails(data);
            } catch (err) {
                setError("Failed to load booking details.");
                console.error(err);
            }
        }

        fetchBookingDetails();
    }, [bookingId]);

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Paper sx={{ maxWidth: 600, margin: "auto", padding: 4, mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Booking Confirmation
            </Typography>
            <Box>
                <Typography>Customer Name: {bookingDetails.customerName}</Typography>
                <Typography>Hotel: {bookingDetails.hotelName}</Typography>
                <Typography>Room Number: {bookingDetails.roomNumber}</Typography>
                <Typography>Room Type: {bookingDetails.roomType}</Typography>
                <Typography>Booking Date: {bookingDetails.bookingDateTime}</Typography>
                <Typography>Total Cost: €{bookingDetails.totalCost}</Typography>
                <Typography>Payment Method: {bookingDetails.paymentMethod}</Typography>
                <Typography>Status: {bookingDetails.bookingStatus}</Typography>
                <Typography>Confirmation Number: {bookingDetails.confirmationNumber}</Typography>
            </Box>
        </Paper>
    );
}
