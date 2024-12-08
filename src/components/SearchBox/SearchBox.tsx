import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


export default function SearchBox() {
    const [location, setLocation] = useState<string>("");
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

    const [guests, setGuests] = useState<string>("1 guest, 1 room");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [adults, setAdults] = useState<number>(2);
    const [children, setChildren] = useState<number>(0);
    const [rooms, setRooms] = useState<number>(1);

    const handleGuestsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleGuestsClose = () => {
        setGuests(`${adults + children} guest${adults + children > 1 ? "s" : ""}, ${rooms} room${rooms > 1 ? "s" : ""}`);
        setAnchorEl(null);
    };

    const handleIncrement = (type: "adults" | "children" | "rooms") => {
        if (type === "adults") setAdults((prev) => prev + 1);
        if (type === "children") setChildren((prev) => prev + 1);
        if (type === "rooms") setRooms((prev) => prev + 1);
    };

    const handleDecrement = (type: "adults" | "children" | "rooms") => {
        if (type === "adults" && adults > 1) setAdults((prev) => prev - 1);
        if (type === "children" && children > 0) setChildren((prev) => prev - 1);
        if (type === "rooms" && rooms > 1) setRooms((prev) => prev - 1);
    };

    return (
        <Container sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: "10px" },
                    backgroundColor: "white",
                    borderRadius: "40px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    padding: "8px",
                    maxWidth: "70%",
                    margin: "0 auto",
                    position: { md: "absolute", xs: 'unset' },
                    marginTop: { md: "-35px", xs: "0px" },
                    marginBottom: { md: "0px", xs: "20px" }
                }}
            >
                {/* Location Field */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                        width: { xs: "100%", md: "fit-content" },
                    }}
                >
                    <LocationOnIcon color="action" />
                    <Box ml={1}>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            Location
                        </Typography>
                        <TextField
                            variant="standard"
                            placeholder="Where are you going?"
                            fullWidth
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottom: "none",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottom: "none",
                                },
                                backgroundColor: "white",
                            }}
                        />
                    </Box>
                </Box>

                <Divider orientation={"vertical"} sx={{ display: { xs: "none", md: "flex" } }} flexItem />

                {/* Check-In Field */}
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px" }}>
                    <CalendarMonthIcon color="action" />
                    <Box ml={1}>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            Check in
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={checkInDate}
                                onChange={(newValue) => setCheckInDate(newValue)}
                                slotProps={{
                                    textField: {
                                        variant: "standard",
                                        placeholder: "07/12/2024",
                                        InputProps: { disableUnderline: true },
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>

                <Divider orientation={"vertical"} sx={{ display: { xs: "none", md: "flex" } }} flexItem />

                {/* Check-Out Field */}
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px" }}>
                    <CalendarMonthIcon color="action" />
                    <Box ml={1}>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            Check out
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={checkOutDate}
                                onChange={(newValue) => setCheckOutDate(newValue)}
                                slotProps={{
                                    textField: {
                                        variant: "standard",
                                        placeholder: "08/12/2024",
                                        InputProps: { disableUnderline: true },
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>

                <Divider orientation={"vertical"} sx={{ display: { xs: "none", md: "flex" } }} flexItem />

                {/* Guests Field */}
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px" }}>
                    <PersonIcon color="action" />
                    <Box ml={1}>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            Guests
                        </Typography>
                        <Button
                            variant="text"
                            onClick={handleGuestsClick}
                            sx={{
                                textTransform: "none",
                                justifyContent: "flex-start",
                                width: "100%",
                                padding: 0,
                                color: "black",
                            }}
                        >
                            {guests}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleGuestsClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            sx={{ mt: 1 }}
                        >
                            <MenuItem>
                                <Typography>Rooms</Typography>
                                <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                                    <IconButton onClick={() => handleDecrement("rooms")}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{rooms}</Typography>
                                    <IconButton onClick={() => handleIncrement("rooms")}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Adults</Typography>
                                <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                                    <IconButton onClick={() => handleDecrement("adults")}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{adults}</Typography>
                                    <IconButton onClick={() => handleIncrement("adults")}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Children</Typography>
                                <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                                    <IconButton onClick={() => handleDecrement("children")}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{children}</Typography>
                                    <IconButton onClick={() => handleIncrement("children")}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {/* Search Button */}
                <Box sx={{ padding: "0 16px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "30px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            textTransform: "none",
                            width: { xs: "100%" },
                            backgroundColor: "#3b8fab",
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
