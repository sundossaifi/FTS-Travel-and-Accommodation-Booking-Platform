import React, { useState } from "react";
import {
    Box,
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    Button,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GridViewIcon from '@mui/icons-material/GridView';
import { useTheme } from "@mui/material/styles";

interface HotelGalleryProps {
    images: string[];
}

export default function HotelGallery({ images }: HotelGalleryProps) {
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    function handleOpenFullscreen(index: number) {
        setSelectedIndex(index);
        setIsFullscreenOpen(true);
    }

    function handleCloseFullscreen() {
        setIsFullscreenOpen(false);
    }

    function handleNext() {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    function handlePrevious() {
        setSelectedIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }

    return (
        <Box sx={{ mt: "2rem" }}>
            {/* Image Grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: isMobile || isMedium ? "1fr" : "repeat(3, 1fr)",
                    gridTemplateRows: isMobile || isMedium ? "auto" : "repeat(2, 310px)",
                    gap: "16px",
                    position: "relative"
                }}
            >
                {/* First Image Spanning Two Rows */}
                {!isMobile && !isMedium && images[0] && (
                    <Box
                        sx={{
                            gridRow: "span 2",
                            gridColumn: "span 1",
                        }}
                    >
                        <img
                            src={images[0]}
                            alt="Hotel 1"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "20px",
                                cursor: "pointer",
                            }}
                            onClick={() => handleOpenFullscreen(0)}
                        />
                    </Box>
                )}

                {/* Remaining Images */}
                {!isMobile && !isMedium &&
                    images.slice(1, 5).map((image, index) => (
                        <Box key={index + 1}>
                            <img
                                src={image}
                                alt={`Hotel ${index + 2}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleOpenFullscreen(index + 1)}
                            />
                        </Box>
                    ))}

                {/* Mobile View & medium screens: Only show the first image */}
                {(isMobile || isMedium) && images[0] && (
                    <Box>
                        <img
                            src={images[0]}
                            alt="Hotel Mobile View"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                            onClick={() => handleOpenFullscreen(0)}
                        />
                    </Box>
                )}

                {/* "All Photos" Button */}
                {images.length > 1 && (
                    <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                        <Button
                            variant="outlined"
                            onClick={() => handleOpenFullscreen(0)}
                            startIcon={<GridViewIcon />}
                            sx={{
                                color: "#fff",
                                border: "1px solid rgba(255,255,255,0.7)",
                                borderRadius: "40px",
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                padding: "8px 16px",
                                textTransform: "none",
                                fontSize: "16px",
                            }}
                        >
                            All Photos
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Fullscreen Dialog */}
            <Dialog
                open={isFullscreenOpen}
                onClose={handleCloseFullscreen}
                fullWidth
                maxWidth="lg"
            >
                <DialogContent
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "black",
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleCloseFullscreen}
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            zIndex: 1,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Previous Button */}
                    <IconButton
                        onClick={handlePrevious}
                        sx={{
                            position: "absolute",
                            left: 16,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>

                    {/* Image Display */}
                    <img
                        src={images[selectedIndex]}
                        alt={`Hotel view ${selectedIndex + 1}`}
                        style={{
                            maxHeight: "90vh",
                            maxWidth: "90%",
                            objectFit: "contain",
                        }}
                    />

                    {/* Next Button */}
                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: "absolute",
                            right: 16,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                    {/* Image Index */}
                    <Typography
                        variant="caption"
                        sx={{
                            position: "absolute",
                            bottom: 16,
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                        }}
                    >
                        {`${selectedIndex + 1} / ${images.length}`}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
