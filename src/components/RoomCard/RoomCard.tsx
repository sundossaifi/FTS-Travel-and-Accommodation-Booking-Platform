import StarRating from "../StarRating";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
} from "@mui/material";

interface RoomCardProps {
    originalRoomPrice: number;
    finalPrice: number;
    cityName: string;
    hotelName: string;
    hotelStarRating: number;
    roomPhotoUrl: string;
    discount: number;
}

export default function RoomCard({
    originalRoomPrice,
    finalPrice,
    cityName,
    hotelName,
    hotelStarRating,
    roomPhotoUrl,
    discount,
}: RoomCardProps) {
    return (
        <Card sx={{
            maxWidth: 345,
            borderRadius: 4,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
        }}>
            <CardMedia
                component="img"
                height="200"
                image={roomPhotoUrl}
                alt={hotelName}
            />
            <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <StarRating rating={hotelStarRating} />
                    <Typography variant="h4" sx={{ fontSize: "20px" }}>{hotelName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <LocationOnIcon color="action" sx={{ fontSize: "20px" }} />
                        <Typography sx={{ fontSize: "14px", color: "#174b71" }}>{cityName}</Typography>
                    </Box>
                    <Divider />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <Typography variant="h5" sx={{ color: "#174b71" }}>${finalPrice}</Typography>
                        <Typography sx={{ color: "#999", textDecoration: "line-through" }}>${originalRoomPrice}</Typography>
                    </Box>
                    <Typography sx={{
                        borderRadius: "50%",
                        backgroundColor: "#174b71",
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 5px",
                        color:"#fff",
                    }}>
                        {`${discount * 100}%`}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}


