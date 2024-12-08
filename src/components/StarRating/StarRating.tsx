import React from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function StarRating({ rating }: { rating: number }) {
    return (
        <Box display="flex" alignItems="center" gap={0.5}>
            {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                    key={index}
                    sx={{ color: index < rating ? "#FFD700" : "#E0E0E0" }}
                    fontSize="small"
                />
            ))}
        </Box>
    );
}