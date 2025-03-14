import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    TextField,
    Box,
    IconButton,
    Menu,
    MenuItem,
    CircularProgress,
    InputAdornment,
    Drawer,
    Button,
    Tooltip
} from "@mui/material";
import { deleteHotel, fetchCities, fetchHotels, fetchHotelsByCity, updateHotel } from "../../../services/adminService";
import { Hotel } from "../../../types/admin";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isTokenExpired } from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function HotelsTable() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [searchType, setSearchType] = useState<"name" | "description">("name");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadHotels() {
            setLoading(true);
            try {
                const data = await fetchHotels(
                    searchType === "name" ? search.trim() : undefined,
                    searchType === "description" ? search.trim() : undefined,
                    rowsPerPage,
                    page + 1
                );
                setHotels(data);
                setHasMore(data.length === rowsPerPage);
            } catch (error) {
                console.error("Failed to fetch hotels", error);
            } finally {
                setLoading(false);
            }
        }

        loadHotels();
    }, [search, rowsPerPage, page, searchType]);

    useEffect(() => {
        async function loadCities() {
            try {
                const cityData = await fetchCities();
                setCities(cityData);
            } catch (error) {
                console.error("Failed to fetch cities", error);
            }
        }

        loadCities();
    }, []);


    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
        setPage(0);
    }

    function handlePageChange(event: unknown, newPage: number) {
        if (newPage > page && !hasMore) return;
        setPage(newPage);
    }

    function handleRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>, hotelId: number) {
        setAnchorEl(event.currentTarget);
        const hotel = hotels.find((h) => h.id === hotelId);
        setSelectedHotel(hotel || null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    function handleFilterMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorElFilter(event.currentTarget);
    }
    function handleFilterMenuClose() {
        setAnchorElFilter(null);
    }

    function handleEdit() {
        if (!selectedHotel?.id || !selectedHotel) {
            alert("Unable to edit. Please try again.");
            return;
        }
        setIsDrawerOpen(true);
        handleMenuClose();
    }

    async function handleDelete() {
        if (!selectedHotel) {
            alert("No hotel selected for deletion.");
            return;
        }

        try {
            const filteredCities = cities.filter(city => ![5, 7, 8].includes(city.id));
            const city = await Promise.all(
                filteredCities.map(async (city) => {
                    const cityHotels = await fetchHotelsByCity(city.id);
                    return cityHotels.find((hotel) => hotel.id === selectedHotel.id) ? city : null;
                })
            );

            const matchedCity = city.find((c) => c !== null);

            if (!matchedCity) {
                alert("City information not found for the selected hotel.");
                return;
            }
            await deleteHotel(matchedCity.id, selectedHotel.id);
            alert("Hotel deleted successfully!");
            setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== selectedHotel.id));
            handleMenuClose();
        } catch (error) {
            console.error("Failed to delete hotel", error);
            alert("Failed to delete hotel. Please try again.");
        }
    }

    function handleSearchType(searchType: "name" | "description") {
        setSearchType(searchType);
        handleFilterMenuClose();
    }

    const formik = useFormik({
        initialValues: {
            name: selectedHotel?.name || "",
            description: selectedHotel?.description || "",
            hotelType: selectedHotel?.hotelType || 0,
            starRating: selectedHotel?.starRating || 0,
            latitude: selectedHotel?.latitude || 0,
            longitude: selectedHotel?.longitude || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            hotelType: Yup.number().required("Hotel type is required"),
            starRating: Yup.number().min(0).max(5).required("Star rating is required"),
            latitude: Yup.number().required("Latitude is required"),
            longitude: Yup.number().required("Longitude is required"),
        }),
        onSubmit: async (values) => {
            const authToken = localStorage.getItem("authToken");

            if (!authToken || isTokenExpired(authToken)) {
                alert("Your session has expired. Please log in again.");
                navigate("/");
                return;
            }

            const hotelId = selectedHotel?.id;

            if (!hotelId) {
                alert("Unable to update the hotel. Please try again.");
                return;
            }

            try {
                await updateHotel(hotelId, values);
                setHotels((prev) =>
                    prev.map((hotel) =>
                        hotel.id === hotelId ? { ...hotel, ...values } : hotel
                    )
                );
                setIsDrawerOpen(false);
            } catch (error) {
                console.error("Error saving data", error);
                alert("Failed to save data. Please check your input and try again.");
            }
        },
    });

    return (
        <Paper sx={{ mt: "20px", width: "100%", borderRadius: "16px" }}>
            <Box sx={{ display: "flex", mb: 2, p: "20px 0px 0px 20px", gap: "5px", width: "100%" }}>
                <TextField
                    variant="outlined"
                    placeholder="Search hotels..."
                    value={search}
                    onChange={handleSearchChange}
                    fullWidth
                    sx={{ maxWidth: 300 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Tooltip title="Search by" placement="top">
                    <IconButton onClick={(event) => handleFilterMenuOpen(event)}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorElFilter}
                    open={Boolean(anchorElFilter)}
                    onClose={handleFilterMenuClose}
                >
                    <MenuItem onClick={() => handleSearchType("name")}>Name</MenuItem>
                    <MenuItem onClick={() => handleSearchType("description")}>Description</MenuItem>
                </Menu>
            </Box>
            <TableContainer>
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 200,
                        }}
                    >
                        <CircularProgress sx={{ color: "#174b71" }} />
                    </Box>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "lightgray" }}>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Hotel Type</TableCell>
                                <TableCell>Star Rating</TableCell>
                                <TableCell>Latitude</TableCell>
                                <TableCell>Longitude</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hotels.map((hotel) => (
                                <TableRow key={hotel.id}>
                                    <TableCell>{hotel.name}</TableCell>
                                    <TableCell>{hotel.description}</TableCell>
                                    <TableCell>{hotel.hotelType}</TableCell>
                                    <TableCell>{hotel.starRating}</TableCell>
                                    <TableCell>{hotel.latitude}</TableCell>
                                    <TableCell>{hotel.longitude}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(event) => handleMenuOpen(event, hotel.id)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                slotProps={{
                    actions: {
                        nextButton: {
                            disabled: !hasMore,
                        },
                    },
                }}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box sx={{ width: 400, padding: 3 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Name"
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
                            error={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
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
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                onClick={() => setIsDrawerOpen(false)}
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
                        </Box>
                    </form>
                </Box>
            </Drawer>
        </Paper>
    )
}
