import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBooking } from "../../services/bookingService";
import { Box, Typography, TextField, Button, Select, MenuItem, FormHelperText, Paper } from "@mui/material";
import CartCard from "../CartCard";
import { isTokenExpired } from "../../utils/authUtils";

export default function CheckoutForm() {
    const { cart, clearCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

    const formik = useFormik({
        initialValues: {
            customerName: "",
            paymentMethod: "",
        },
        validationSchema: Yup.object({
            customerName: Yup.string().required("Customer name is required"),
            paymentMethod: Yup.string().required("Payment method is required"),
        }),
        onSubmit: async (values) => {
            const authToken = localStorage.getItem("authToken");

            if (!authToken || isTokenExpired(authToken)) {
                alert("Your session has expired. Please log in again.");
                navigate("/");
                return; 
            }

            try {
                const bookingPromises = cart.map((item) =>
                    createBooking({
                        customerName: values.customerName,
                        hotelName: item.hotelName,
                        roomNumber: item.roomNumber,
                        roomType: item.roomType,
                        bookingDateTime: new Date().toISOString(),
                        totalCost: item.price,
                        paymentMethod: values.paymentMethod,
                    })
                );

                const bookingResponses = await Promise.all(bookingPromises);
                const firstConfirmationNumber = bookingResponses[0]?.confirmationNumber;

                if (firstConfirmationNumber) {
                    clearCart();
                    navigate(`/confirmation/${firstConfirmationNumber}`);
                } else {
                    console.error("No confirmation number found in the response.");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error confirming booking:", error.message);
                } else {
                    console.error("An unknown error occurred.");
                }
            }
        },
    });

    return (
        <Paper sx={{ maxWidth: 600, margin: "auto", padding: 4, mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Checkout
            </Typography>

            <Box mb={2}>
                <Typography variant="h6" gutterBottom>
                    Your Booking Details
                </Typography>
                {cart.map((item) => (
                    <CartCard
                        key={item.roomId}
                        roomId={item.roomId}
                        roomType={item.roomType}
                        price={item.price}
                        roomPhotoUrl={item.roomPhotoUrl}
                        removeFromCart={removeFromCart}
                    />
                ))}
                <Typography fontWeight="bold" sx={{ textAlign: "right", mt: 2 }}>
                    Total: ${totalCost}
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label="Customer Name"
                    id="customerName"
                    name="customerName"
                    value={formik.values.customerName}
                    onChange={formik.handleChange}
                    error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                    helperText={formik.touched.customerName && formik.errors.customerName}
                    margin="normal"
                />

                <Select
                    fullWidth
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select Payment Method</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="PayPal">PayPal</MenuItem>
                </Select>
                {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                    <FormHelperText error>{formik.errors.paymentMethod}</FormHelperText>
                )}

                <Button type="submit" variant="contained" fullWidth sx={{
                    mt: 2, backgroundColor: "#174b71",
                }}>
                    Confirm Booking
                </Button>
            </form>
        </Paper>
    );
}
