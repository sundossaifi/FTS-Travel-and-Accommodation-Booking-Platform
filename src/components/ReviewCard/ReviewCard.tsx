import { Box, Divider, Avatar, Typography } from "@mui/material";
import StarRating from "../StarRating";

interface ReviewCardProps {
    customerName: string;
    rating: number;
    description: string;
}

export default function ReviewCard({ customerName, rating, description }: ReviewCardProps) {
    return (
        <Box sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <Divider />
            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>
                <Avatar
                    src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt={customerName}
                    sx={{ width: 50, height: 50, marginRight: 2 }}
                />
                <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {customerName}
                </Typography>
            </Box>
            <StarRating rating={rating} />
            <Typography sx={{
                color:"#74818a",
                fontSize:"16px",
                mb:"10px"
            }}>
                {description}
            </Typography>
        </Box>
    )
}