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
    MenuItem,
    Select,
    InputAdornment,
    SelectChangeEvent,
    IconButton,
    Menu,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchCities, fetchRooms } from "../../../services/adminService";
import { City } from "../../../types/admin";
import { Room } from "../../../types/room";

export default function RoomsTable() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCity, setSelectedCity] = useState<number | null>(1);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

    useEffect(() => {
        async function loadCities() {
            try {
                const cityData = await fetchCities();
                setCities(cityData);
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        }
        loadCities();
    }, []);

    useEffect(() => {
        async function loadRooms() {
            if (!selectedCity) return;
            setLoading(true);
            try {
                const data = await fetchRooms(selectedCity);
                setRooms(data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            } finally {
                setLoading(false);
            }
        }
        loadRooms();
    }, [selectedCity]);

    function handleCityChange(event: SelectChangeEvent<number>) {
        setSelectedCity(Number(event.target.value));
        setPage(0);
    }

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

    const filteredRooms = rooms.filter((room) =>
        room.roomType.toLowerCase().includes(search.toLowerCase())
    );

    // Apply pagination to the filtered rooms
    const paginatedRooms = filteredRooms.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>, roomId: number) {
        setAnchorEl(event.currentTarget);
        setSelectedRoomId(roomId || null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    return (
        <Paper sx={{ mt: "20px", width: "100%", borderRadius: "16px" }}>
            <Box sx={{ display: "flex", mb: 2, p: "20px", gap: "10px", justifyContent: "space-between", alignItems: "center" }}>
                <TextField
                    variant="outlined"
                    placeholder="Search rooms..."
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
                <Select
                    value={selectedCity || ""}
                    onChange={handleCityChange}
                    displayEmpty
                    fullWidth
                    sx={{ maxWidth: 200 }}
                >
                    <MenuItem value="" disabled>
                        Select a City
                    </MenuItem>
                    {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                            {city.name}
                        </MenuItem>
                    ))}
                </Select>
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
                                <TableCell>Room Number</TableCell>
                                <TableCell>Room Type</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Capacity (Adults)</TableCell>
                                <TableCell>Capacity (Children)</TableCell>
                                <TableCell>Availability</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRooms.map((room) => (
                                <TableRow key={room.roomId}>
                                    <TableCell>{room.roomNumber}</TableCell>
                                    <TableCell>{room.roomType}</TableCell>
                                    <TableCell>${room.price}</TableCell>
                                    <TableCell>{room.capacityOfAdults}</TableCell>
                                    <TableCell>{room.capacityOfChildren}</TableCell>
                                    <TableCell>{room.availability ? "Available" : "Unavailable"}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(event) => handleMenuOpen(event, room.roomId)}
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
                count={filteredRooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem >Edit</MenuItem>
                <MenuItem >Delete</MenuItem>
            </Menu>
        </Paper>
    );
}
