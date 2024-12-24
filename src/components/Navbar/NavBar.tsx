import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
    Badge,
    Divider,
    Drawer,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CartCard from '../CartCard';
import LogoutDialog from '../LogoutDialog';

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const { cart, removeFromCart } = useCart();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const navigate = useNavigate();

    const pages = [
        { name: 'Home', path: '/Home' },
        { name: 'Search', path: '/search-results' },
    ]

    function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElNav(event.currentTarget);
    }

    function handleCloseNavMenu() {
        setAnchorElNav(null);
    }

    function handleCheckout() {
        navigate('/checkout');
        setDrawerOpen(false);
    }

    function toggleDrawer(open: boolean) {
        setDrawerOpen(open);
    }

    function handleLogoutConfirm() {
        localStorage.removeItem('authToken');
        setLogoutDialogOpen(false);
        navigate('/');
    }

    function handleLogoutCancel() {
        setLogoutDialogOpen(false);
    }

    return (
        <AppBar position="absolute" sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: 'none',
            top: 0
        }}>
            <Container maxWidth="xl" sx={{ width: "100%" }}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
                    <Box sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                        <Box sx={{ display: 'flex' }}>
                            <FlightTakeoffIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/Home"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                traveler
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography
                                            component={Link}
                                            to={page.path}
                                            sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <FlightTakeoffIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/Home"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            traveler
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
                            <Container sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page.name}
                                        component={Link}
                                        to={page.path}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page.name}
                                    </Button>
                                ))}
                            </Container>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Box>
                            <IconButton
                                size="large"
                                onClick={() => toggleDrawer(true)}
                                color='inherit'
                            >
                                <Badge badgeContent={cart.length} sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#174b71",
                                        color: "#ffffff"
                                    },
                                }}>
                                    <ShoppingBagIcon />
                                </Badge>
                            </IconButton>
                            <Drawer anchor="right" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        width: 300,
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Your Cart
                                        </Typography>
                                        <Divider />
                                        {cart.length > 0 ? (
                                            cart.map((item) => (
                                                <CartCard
                                                    key={item.roomId}
                                                    roomId={item.roomId}
                                                    roomType={item.roomType}
                                                    roomPhotoUrl={item.roomPhotoUrl}
                                                    removeFromCart={() => removeFromCart(item.roomId)}
                                                    price={item.price}
                                                />
                                            ))
                                        ) : (
                                            <Typography sx={{ textAlign: "center", mt: 2 }}>
                                                Your cart is empty.
                                            </Typography>
                                        )}
                                    </Box>

                                    {cart.length > 0 && (
                                        <Button
                                            onClick={handleCheckout}
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                borderRadius: "30px",
                                                padding: "10px 20px",
                                                fontSize: "16px",
                                                textTransform: "none",
                                                width: "100%",
                                                backgroundColor: "#174b71",
                                            }}
                                        >
                                            Pay now
                                        </Button>
                                    )}
                                </Box>
                            </Drawer>
                        </Box>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => setLogoutDialogOpen(true)}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
            <LogoutDialog
                open={logoutDialogOpen}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />
        </AppBar>
    );
}
