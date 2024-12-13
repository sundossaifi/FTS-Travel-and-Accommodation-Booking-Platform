import { Box, Card, CardMedia, Typography } from "@mui/material";

interface TrendingDestinationCardProps {
    cityName: string;
    countryName: string;
    thumbnailUrl: string;
}

export default function TrendingDestinationCard({ cityName, countryName, thumbnailUrl }: TrendingDestinationCardProps) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                borderRadius: 4,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <CardMedia
                component="img"
                height="250"
                image={thumbnailUrl}
                alt={cityName}
                sx={{ filter: "brightness(0.7)" }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {cityName}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {countryName}
                </Typography>
            </Box>
        </Card>

    );
}