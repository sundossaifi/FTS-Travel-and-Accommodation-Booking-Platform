import React, { useState } from "react";
import { Box, Slider, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface PriceFilterCardProps {
    onChange: (priceRange: [number, number]) => void;
}

export default function PriceFilterCard({ onChange }: PriceFilterCardProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [open, setOpen] = useState(true);

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        const range = newValue as [number, number];
        setPriceRange(range);
        onChange(range);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "20px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                width: "250px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Filter Price
                </Typography>
                <IconButton onClick={handleToggle} size="small">
                    {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>
            <Collapse in={open}>
                <Box sx={{ marginTop: "16px" }}>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                        step={10}
                        sx={{ marginBottom: 2 ,color:"#174b71"}}
                    />
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            padding: "4px 12px",
                            borderRadius: "10px",
                            border: "1px solid #DEDEDE",
                        }}>
                            <Typography>
                                Min price:
                            </Typography>
                            <Typography>
                                ${priceRange[0].toFixed(2)}
                            </Typography>
                        </Box>
                        <Typography>-</Typography>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            padding: "4px 12px",
                            borderRadius: "10px",
                            border: "1px solid #DEDEDE",
                        }}>
                            <Typography>
                                Max price:
                            </Typography>
                            <Typography>
                                ${priceRange[1].toFixed(2)}
                            </Typography>
                        </Box>
                    </Box >
                </Box>
            </Collapse>
        </Box>
    );
}
