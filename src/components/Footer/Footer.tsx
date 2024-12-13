import styles from "./Footer.module.css";
import { Box, Grid2, Link, Typography, Divider } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
    const services = ["Booking hotels", "Find trending destinations", "Find featured deals"]
    return (
        <footer className={styles.footer}>
            <Box display={"flex"} justifyContent={"space-evenly"} flexDirection={"column"} sx={{ width: "80%", height: "100%" }}>
                <Grid2 container justifyContent={"space-between"} sx={{ width: "100%" }}>
                    <Grid2 size={{ xs: 12, md: 3 }}>
                        <Box display={"flex"} flexDirection={"column"}>
                            <FlightTakeoffIcon sx={{ mb: "10px" }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#174b71',
                                    textDecoration: 'none',
                                }}
                            >
                                traveler
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 3 }}>
                        <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
                            <Typography sx={{ fontWeight: "700", fontSize: "18px", mb: "10px" }}>
                                Services
                            </Typography>
                            {services.map((service,index) => (
                                <Typography key={index} sx={{ color: "#727272", fontSize: "16px" }}>{service}</Typography>
                            ))}
                        </Box>
                    </Grid2>
                    <Grid2>
                        <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
                            <Typography sx={{ fontWeight: "700", fontSize: "18px", mb: "10px" }}>
                                Social
                            </Typography>
                            <Box display={"flex"} gap={"10px"}>
                                <Link href="#" color="inherit">
                                    <FacebookIcon />
                                </Link>
                                <Link href="#" color="inherit">
                                    <InstagramIcon />
                                </Link>
                                <Link href="#" color="inherit">
                                    <XIcon />
                                </Link>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
                    <Divider />
                    <Typography sx={{ color: "#727272", fontSize: "16px" }}>
                        ©Copyright Sundos Saifi
                    </Typography>
            </Box>
        </footer>
    )
}