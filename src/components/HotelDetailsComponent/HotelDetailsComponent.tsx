import { Grid2, Typography, Box, Divider } from "@mui/material";
import { Amenity } from "../../types/hotel";
import MapComponent from "../MapComponent";
import VerifiedIcon from '@mui/icons-material/Verified';

interface HotelDetailsProps {
    hotelDescription: string;
    lat: number;
    lng: number;
    amenities: Amenity[];
}

export default function HotelDetails({ hotelDescription, lat, lng, amenities, }: HotelDetailsProps) {
    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} sx={{
            width: "100%",
            height: {xs:"fit-content",md:"300px"},
            mt: "3rem",
        }}>
            <Typography variant="h2" sx={{
                fontSize: "26px",
                fontWeight: "700",
                lineHeight: "36px",
            }}>
                About this Hotel
            </Typography>
            <Grid2 container justifyContent={"space-between"} spacing={3} sx={{ height: "70%" }}  >
                <Grid2 size={{ xs: 12, sm: 6, md: 8 }}>
                    <Grid2 container height={"100%"} flexDirection={"column"} justifyContent={"space-evenly"}>
                        <Grid2 size={{ xs: 12 }}>
                            <Typography>{hotelDescription}</Typography>
                            <Divider />
                        </Grid2>
                        <Grid2
                            size={{ xs: 12 }}
                        >
                            <Grid2 container flexDirection={"column"} justifyContent={"space-between"} height={"100px"} >
                                {amenities.map((amenity, index) => (
                                    <Grid2 key={index}>
                                        <Box display={"flex"} gap={"10px"}>
                                            <VerifiedIcon sx={{ color: "#5E6D77" }} />
                                            <Typography sx={{
                                                fontWeight: "400px",
                                                fontSize: "16px",
                                                color: "#5E6D77"
                                            }}>
                                                {amenity.name}
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Divider/>

                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <MapComponent lng={lng} lat={lat} />
                </Grid2>
            </Grid2>
        </Box >
    )
}