import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
    Chip,
    Button,
    CardActions
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarRating from "../StarRating";
import { Amenity } from "../../types/hotel";

interface HotelCardProps {
    hotel: {
        hotelId: number;
        hotelName: string;
        starRating: number;
        roomPrice: number;
        roomType: string;
        cityName: string;
        roomPhotoUrl: string;
        discount: number;
        amenities: Amenity[];
    };
}

export default function HotelCard({ hotel }: HotelCardProps) {
    const discountedPrice = hotel.roomPrice - hotel.roomPrice * hotel.discount;

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                backgroundColor: "white",
                width: "100%",
                maxWidth: "900px",
                margin: "auto",
            }}
        >
            <CardMedia
                component="img"
                height="270px"
                image={hotel.roomPhotoUrl}
                alt={hotel.hotelName}
                sx={{ width: "300px" }}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <StarRating rating={hotel.starRating} />
                    <Typography variant="h4" sx={{ fontSize: "20px" }}>{hotel.hotelName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <LocationOnIcon color="action" sx={{ fontSize: "20px" }} />
                        <Typography sx={{ fontSize: "14px", color: "#174b71" }}>{hotel.cityName}</Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {hotel.amenities.map((amenity) => (
                        <Chip
                            key={amenity.name}
                            label={amenity.name}
                            size="small"
                            sx={{ backgroundColor: "#f1f1f1", fontSize: "12px" }}
                        />
                    ))}
                </Box>
            </CardContent>
            <Divider orientation="vertical" />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    paddingRight: { md: "20px", xs: "0px" },
                    paddingBottom: { xs: "20px", md: "0px" },
                }}
            >
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "#174b71" }}>
                        {hotel.starRating}/5
                    </Typography>
                    <Typography variant="body2">
                        From: <Typography component="span" sx={{ fontWeight: "bold", color: "#174b71" }}>${discountedPrice.toFixed(0)}</Typography> /night
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#174b71",
                        borderRadius: "30px",
                        padding: "10px 20px",
                        fontSize: "14px",
                        textTransform: "none",
                    }}
                >
                    View details
                </Button>
            </Box>
        </Card>
    );
}
