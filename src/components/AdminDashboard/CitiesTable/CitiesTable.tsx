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
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    InputAdornment,
    Drawer,
    Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchCitiesList, fetchCityDetails, updateCity, deleteCity } from "../../../services/adminService";
import { City } from "../../../types/admin";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CitiesTable() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        async function loadCities() {
            setLoading(true);
            try {
                const data = await fetchCitiesList(rowsPerPage, page + 1);
                setCities(data);
                setHasMore(data.length === rowsPerPage);
            } catch (error) {
                console.error("Failed to fetch cities", error);
            } finally {
                setLoading(false);
            }
        }
        loadCities();
    }, [rowsPerPage, page]);

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
        setPage(0);
    }

    function handlePageChange(_: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>, cityId: number) {
        setAnchorEl(event.currentTarget);
        const city = cities.find((c) => c.id === cityId);
        setSelectedCity(city || null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    async function handleEdit() {
        if (!selectedCity) return;
        try {
            const cityDetails = await fetchCityDetails(selectedCity.id);
            setSelectedCity(cityDetails);
            setIsDrawerOpen(true);
        } catch (error) {
            alert("Failed to fetch city details.");
        } finally {
            handleMenuClose();
        }
    }

    async function handleDelete() {
        if (!selectedCity) return;
        try {
            await deleteCity(selectedCity.id);
            setCities((prev) => prev.filter((city) => city.id !== selectedCity.id));
            alert("City deleted successfully!");
        } catch (error) {
            alert("Failed to delete city. Please try again.");
        } finally {
            handleMenuClose();
        }
    }

    const formik = useFormik({
        initialValues: {
            name: selectedCity?.name || "",
            description: selectedCity?.description || "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("City name is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: async (values) => {
            if (!selectedCity) return;
            try {
                await updateCity(selectedCity.id, values);
                setCities((prev) =>
                    prev.map((city) =>
                        city.id === selectedCity.id ? { ...city, ...values } : city
                    )
                );
                alert("City updated successfully!");
                setIsDrawerOpen(false);
            } catch (error) {
                alert("Failed to update city. Please try again.");
            }
        },
    });

    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Paper sx={{ mt: "20px", width: "100%", borderRadius: "16px" }}>
            <Box sx={{ display: "flex", mb: 2, p: "20px 0px 0px 20px", gap: "5px", width: "100%" }}>
                <TextField
                    variant="outlined"
                    placeholder="Search cities..."
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
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCities.map((city) => (
                                <TableRow key={city.id}>
                                    <TableCell>{city.name}</TableCell>
                                    <TableCell>{city.description}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(event) => handleMenuOpen(event, city.id)}
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
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box sx={{ width: 400, padding: 3 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="City Name"
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
                                sx={{ backgroundColor: "#174b71" }}
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Drawer>
        </Paper>
    )
}
