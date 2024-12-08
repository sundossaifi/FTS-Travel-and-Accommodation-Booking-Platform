import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function SearchBox() {
    const [location, setLocation] = useState<string>("");
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState<string>("1 guest, 1 room");

    return (
        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: '10px' },
                    backgroundColor: "white",
                    borderRadius: "40px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    padding: "8px",
                    maxWidth: "70%",
                    margin: "0 auto",
                    position: "absolute",
                    marginTop: '-35px'
                }}
            >
                {/* Location Field */}
                <Box
                    sx={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px", width: { xs: '100%', md: 'fit-content' } }}
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
                                backgroundColor: 'white'
                            }}
                        />
                    </Box>
                </Box>

                <Divider orientation={"vertical"} sx={{ display: { xs: "none", md: 'flex' } }} flexItem />
                <Divider orientation={"horizontal"} sx={{ display: { md: "none" } }} flexItem />

                {/* Check-In Field */}
                <Box sx={{ flex: 1, display: "flex", alignItems: { md: 'center', xs: "flex-start" }, padding: "0 16px" }}>
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

                <Divider orientation={"vertical"} sx={{ display: { xs: "none", md: 'flex' } }} flexItem />
                <Divider orientation={"horizontal"} sx={{ display: { md: "none" } }} flexItem />

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

                <Divider orientation={"vertical"} sx={{ display: { xs: "none", md: 'flex' } }} flexItem />
                <Divider orientation={"horizontal"} sx={{ display: { md: "none" } }} flexItem />

                {/* Guests Field */}
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px" }}>
                    <PersonIcon color="action" />
                    <Box ml={1}>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            Guests
                        </Typography>
                        <TextField
                            variant="standard"
                            placeholder="1 guest, 1 room"
                            fullWidth
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}

                        />
                    </Box>
                </Box>

                <Divider orientation={"vertical"} sx={{ display: { xs: "none", md: 'flex' } }} flexItem />
                <Divider orientation={"horizontal"} sx={{ display: { md: "none" } }} flexItem />

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
                            width: { xs: '100%' },
                            backgroundColor: '#0a3e66'
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};


