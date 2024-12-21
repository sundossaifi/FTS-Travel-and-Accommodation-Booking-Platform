import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function NotFound() {
    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 10,
            }}
        >
            <Typography variant="h4" color="error">
                404 - Page Not Found
            </Typography>
            <Typography variant="body1">
                The page you’re looking for doesn’t exist.
            </Typography>
            <Link to="/">Go to Login</Link>
        </Box>
    );
}
