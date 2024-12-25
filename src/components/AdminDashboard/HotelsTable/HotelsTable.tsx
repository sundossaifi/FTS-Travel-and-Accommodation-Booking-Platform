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
    Avatar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    CircularProgress,
    InputAdornment,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchHotels, Hotel } from "../../../services/adminService";
import SearchIcon from "@mui/icons-material/Search";

export default function HotelsTable() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

    useEffect(() => {
        async function loadHotels() {
            setLoading(true);
            try {
                const data = await fetchHotels(undefined, search, rowsPerPage, page + 1);
                setHotels(data);
                setHasMore(data.length === rowsPerPage);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch hotels", error);
                setLoading(false);
            }
        }
        loadHotels();
    }, [search, rowsPerPage, page]);

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
        setSelectedHotelId(hotelId);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        setSelectedHotelId(null);
    }

    function handleEdit() {
        console.log(`Edit hotel with ID: ${selectedHotelId}`);
        handleMenuClose();
    }

    function handleDelete() {
        console.log(`Delete hotel with ID: ${selectedHotelId}`);
        handleMenuClose();
    }

    return (
        <Paper sx={{ mt: "20px", padding: "20px", width: "100%", borderRadius: "16px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
                            <TableRow>
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
                <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
                    Delete
                </MenuItem>
            </Menu>
        </Paper>
    );
}
