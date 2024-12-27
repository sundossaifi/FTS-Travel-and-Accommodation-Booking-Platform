import { useState, useEffect } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import HotelsTable from "../../../components/AdminDashboard/HotelsTable";
import ContentHeader from "../../../components/AdminDashboard/ContentHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchCities, addHotelToCity } from "../../../services/adminService";
import { City } from "../../../types/admin";
import { isTokenExpired } from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function ManageHotels() {
    const [openDialog, setOpenDialog] = useState(false);
    const [cities, setCities] = useState<City[]>([]);
    const [loadingCities, setLoadingCities] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (openDialog) {
            (async () => {
                setLoadingCities(true);
                try {
                    const cityData = await fetchCities();
                    const filteredCities = cityData.filter(city => ![5, 7, 8].includes(city.id));
                    setCities(filteredCities);
                } catch (error) {
                    console.error("Failed to load cities", error);
                } finally {
                    setLoadingCities(false);
                }
            })();
        }
    }, [openDialog]);

    const formik = useFormik({
        initialValues: {
            cityId: "",
            name: "",
            description: "",
            hotelType: 0,
            starRating: 0,
            latitude: 0,
            longitude: 0,
        },
        validationSchema: Yup.object({
            cityId: Yup.string().required("City is required"),
            name: Yup.string().required("Hotel name is required"),
            description: Yup.string().required("Description is required"),
            hotelType: Yup.number().required("Hotel type is required"),
            starRating: Yup.number().min(0).max(5).required("Star rating is required"),
            latitude: Yup.number().required("Latitude is required"),
            longitude: Yup.number().required("Longitude is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const authToken = localStorage.getItem("authToken");

            if (!authToken || isTokenExpired(authToken)) {
                alert("Your session has expired. Please log in again.");
                navigate("/");
                return;
            }

            try {
                await addHotelToCity(Number(values.cityId), {
                    name: values.name,
                    description: values.description,
                    hotelType: values.hotelType,
                    starRating: values.starRating,
                    latitude: values.latitude,
                    longitude: values.longitude,
                });
                alert("Hotel added successfully!");
                resetForm();
                setOpenDialog(false);
            } catch (error) {
                console.error("Failed to add hotel", error);
                alert("Failed to add hotel. Please try again.");
            }
        },
    });

    return (
        <Box sx={{ height: "100%", width: "90%", margin: "10px 0px" }}>
            <ContentHeader
                title="Manage Hotels"
                actionTitle="Add Hotel"
                onActionClick={() => setOpenDialog(true)}
            />
            <HotelsTable />

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Add Hotel</DialogTitle>
                <DialogContent>
                    {loadingCities ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                select
                                label="City"
                                fullWidth
                                margin="normal"
                                name="cityId"
                                value={formik.values.cityId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                                helperText={formik.touched.cityId && formik.errors.cityId}
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id.toString()}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Hotel Name"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                margin="normal"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                            <TextField
                                label="Hotel Type"
                                fullWidth
                                margin="normal"
                                name="hotelType"
                                type="number"
                                value={formik.values.hotelType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.hotelType && Boolean(formik.errors.hotelType)}
                                helperText={formik.touched.hotelType && formik.errors.hotelType}
                            />
                            <TextField
                                label="Star Rating"
                                fullWidth
                                margin="normal"
                                name="starRating"
                                type="number"
                                value={formik.values.starRating}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.starRating && Boolean(formik.errors.starRating)}
                                helperText={formik.touched.starRating && formik.errors.starRating}
                            />
                            <TextField
                                label="Latitude"
                                fullWidth
                                margin="normal"
                                name="latitude"
                                type="number"
                                value={formik.values.latitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                                helperText={formik.touched.latitude && formik.errors.latitude}
                            />
                            <TextField
                                label="Longitude"
                                fullWidth
                                margin="normal"
                                name="longitude"
                                type="number"
                                value={formik.values.longitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                                helperText={formik.touched.longitude && formik.errors.longitude}
                            />
                            <DialogActions>
                                <Button
                                    onClick={() => setOpenDialog(false)}
                                     sx={{ mr: 1, color: "#174b71" }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#174b71",
                                    }}>
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    )
}
