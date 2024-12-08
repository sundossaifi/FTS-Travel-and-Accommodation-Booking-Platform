import { Box, Typography } from "@mui/material";

interface TrendingDestinationCardProps {
    cityName: string;
    countryName: string;
    thumbnailUrl: string;
}

export default function TrendingDestinationCard({ cityName, countryName, thumbnailUrl }: TrendingDestinationCardProps) {
    return (
        <Box
            sx={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                width: "350px",
                height: "250px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.7)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {cityName}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {countryName}
                </Typography>
            </Box>
        </Box>

    );
}