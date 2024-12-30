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
    Drawer,
    Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchHotels, fetchRooms, updateRoom, deleteRoom } from "../../../services/adminService"; // Add deleteRoom
import { Hotel } from "../../../types/admin";
import { Room } from "../../../types/room";
import { isTokenExpired } from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function RoomsTable({ onSelectHotel }: { onSelectHotel: (hotelId: number | null) => void }) {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadHotels() {
            try {
                const hotelData = await fetchHotels();
                setHotels(hotelData);
                const defaultHotelId = hotelData[0]?.id || null;
                setSelectedHotel(defaultHotelId);
                onSelectHotel(defaultHotelId);
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
            }
        }
        loadHotels();
    }, [onSelectHotel]);

    useEffect(() => {
        async function loadRooms() {
            if (!selectedHotel) return;
            setLoading(true);
            try {
                const data = await fetchRooms(selectedHotel);
                setRooms(data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            } finally {
                setLoading(false);
            }
        }
        loadRooms();
    }, [selectedHotel]);

    function handleHotelChange(event: SelectChangeEvent<number>) {
        const hotelId = Number(event.target.value);
        setSelectedHotel(hotelId);
        onSelectHotel(hotelId);
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

    const paginatedRooms = filteredRooms.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>, room: Room) {
        setAnchorEl(event.currentTarget);
        setSelectedRoom(room);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    async function handleDeleteRoom() {
        if (!selectedRoom || !selectedHotel) return;

        try {
            await deleteRoom(selectedHotel, selectedRoom.roomId); // Call deleteRoom API
            alert("Room deleted successfully!");
            setRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== selectedRoom.roomId)); // Update UI
        } catch (error) {
            console.error("Failed to delete room:", error);
            alert("Failed to delete the room. Please try again.");
        } finally {
            handleMenuClose(); // Close menu after delete
        }
    }

    const formik = useFormik({
        initialValues: {
            roomNumber: selectedRoom?.roomNumber || "",
            cost: selectedRoom?.price || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            roomNumber: Yup.string().required("Room number is required"),
            cost: Yup.number().min(1, "Cost must be greater than 0").required("Cost is required"),
        }),
        onSubmit: async (values) => {
            const authToken = localStorage.getItem("authToken");

            if (!authToken || isTokenExpired(authToken)) {
                alert("Your session has expired. Please log in again.");
                navigate("/");
                return;
            }
            if (!selectedRoom) return;
            try {
                await updateRoom(selectedRoom.roomId, {
                    roomNumber: String(values.roomNumber),
                    cost: values.cost,
                });
                alert("Room updated successfully!");
                setIsDrawerOpen(false);
                setRooms((prevRooms) =>
                    prevRooms.map((room) =>
                        room.roomId === selectedRoom.roomId
                            ? {
                                ...room,
                                roomNumber: Number(values.roomNumber),
                                price: values.cost,
                            } : room
                    )
                );

            } catch (error) {
                console.error("Failed to update room:", error);
                alert("Failed to update the room. Please try again.");
            }
        },
    });

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
                    value={selectedHotel || ""}
                    onChange={handleHotelChange}
                    displayEmpty
                    fullWidth
                    sx={{ maxWidth: 200 }}
                >
                    <MenuItem value="" disabled>
                        Select a Hotel
                    </MenuItem>
                    {hotels.map((hotel) => (
                        <MenuItem key={hotel.id} value={hotel.id}>
                            {hotel.name}
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
                                            onClick={(event) => handleMenuOpen(event, room)}
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
                <MenuItem
                    onClick={() => {
                        setIsDrawerOpen(true);
                        handleMenuClose();
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={handleDeleteRoom} 
                >
                    Delete
                </MenuItem>
            </Menu>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box sx={{ width: 400, padding: 3 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Room Number"
                            fullWidth
                            margin="normal"
                            name="roomNumber"
                            value={formik.values.roomNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
                            helperText={formik.touched.roomNumber && formik.errors.roomNumber}
                        />
                        <TextField
                            label="Cost"
                            fullWidth
                            margin="normal"
                            name="cost"
                            type="number"
                            value={formik.values.cost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cost && Boolean(formik.errors.cost)}
                            helperText={formik.touched.cost && formik.errors.cost}
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                onClick={() => setIsDrawerOpen(false)}
                                sx={{ mr: 1, color: "#174b71" }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: "#174b71", }}>
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Drawer>
        </Paper>
    )
}
