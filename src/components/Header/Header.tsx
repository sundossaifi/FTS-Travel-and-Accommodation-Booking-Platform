import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Header() {
    return (
        <Box sx={{
            minHeight: '90vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url(https://andtour-react.netlify.app/static/media/bg.70c7fc62f19b1932f5eb.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Container sx={{ display: "flex", width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h1" sx={{
                    color: "white", fontSize: { md: "64px", xs: "40px" }, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', textAlign: 'center'
                }}>
                    Let the journey begin
                </Typography>
                <Typography variant="h1" sx={{
                    color: "white", fontSize: { xs: '15px', md: '20px' }, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', textAlign: 'center'
                }}>
                    Find awesome cities, hotels and book them
                </Typography>
            </Container>

        </Box>
    )
}