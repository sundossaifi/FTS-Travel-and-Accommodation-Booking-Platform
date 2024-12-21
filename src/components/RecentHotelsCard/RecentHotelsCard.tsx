import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { RecentHotel } from "../../types/hotel";
import StarRating from "../StarRating";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface RecentHotelsCardProps {
    hotel: RecentHotel;
}

export default function RecentHotelsCard({ hotel }: RecentHotelsCardProps) {
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
                image={hotel.thumbnailUrl}
                alt={hotel.hotelName}
            />
            <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <StarRating rating={hotel.starRating} />
                    <Typography variant="h4" sx={{ fontSize: "20px" }}>{hotel.hotelName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <LocationOnIcon color="action" sx={{ fontSize: "20px" }} />
                        <Typography sx={{ fontSize: "14px", color: "#174b71" }}>{hotel.cityName}</Typography>
                    </Box>
                    <Divider />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <Box sx={{ display: "flex", gap: "8px", flexDirection:"column", justifyContent: "center" }}>
                        <Typography variant="h6" color="textPrimary">
                            ${hotel.priceLowerBound} - ${hotel.priceUpperBound}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Last visited: {new Date(hotel.visitDate).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}