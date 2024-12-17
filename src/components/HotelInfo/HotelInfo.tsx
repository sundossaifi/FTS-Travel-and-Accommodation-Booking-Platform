import { Box, Grid2, Button, Typography } from "@mui/material";
import StarRating from "../StarRating";

interface HotelInfoPros {
    hotelLocation: string;
    starRating: number;
    reviewsCount: number;
    onReserveClick: () => void;
}
export default function HotelInfo({ hotelLocation, starRating, reviewsCount, onReserveClick }: HotelInfoPros) {
    return (
        <Box sx={{ width: "100%", mt: "3rem" }}>
            <Grid2 container justifyContent={"space-between"}>
                <Grid2>
                    <Grid2 container flexDirection={"column"} gap={"5px"}>
                        <Grid2>
                            <StarRating rating={starRating} />
                        </Grid2>
                        <Grid2 display={"flex"} alignItems={"center"} gap={"5px"}>
                            <Box sx={{
                                border: "solid 1px #174b71",
                                borderRadius: "5px",
                                color: "#174b71",
                                fontWeight: "bold",
                                width: "fit-content",
                                padding: "4px 8px",
                                background: "#F9FBFF"
                            }}>
                                {`${starRating}/5`}
                            </Box>
                            <Typography sx={{ color: "#5E6D77", fontSize: "16px", fontWeight: "400" }} >{hotelLocation}</Typography>
                            <Typography sx={{ color: "#174b71", }}>
                                {`(${reviewsCount} reviews)`}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2>
                    <Button
                        onClick={onReserveClick}
                        type="button"
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "30px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            textTransform: "none",
                            width: { xs: "100%" },
                            backgroundColor: "#174b71",
                            display: { xs: "none", md: "block" }
                        }}
                    >
                        Reserve a room
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    )
}