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
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Search', path: '/search-results' },
    ];

    function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElNav(event.currentTarget);
    };

    function handleCloseNavMenu() {
        setAnchorElNav(null);
    };
    function handleOpenCartMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElCart(event.currentTarget);
    };

    function handleCloseCartMenu() {
        setAnchorElCart(null);
    };

    function handleNavigate(path: string) {
        navigate(path);
        handleCloseNavMenu();
    };

    return (
        <AppBar position="absolute" sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: 'none',
            top:0
        }}>
            <Container maxWidth="xl" sx={{ width: "100%" }} >
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
                    <Box sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                        <Box sx={{ display: 'flex' }}>
                            <FlightTakeoffIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href=""
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
                                    <MenuItem key={page.name}
                                        onClick={() => handleNavigate(page.path)}>
                                        <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <FlightTakeoffIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
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
                                        onClick={() => handleNavigate(page.path)}
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
                                onClick={handleOpenCartMenu}
                                color='inherit'
                            >
                                <Badge badgeContent={5} sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#174b71",
                                        color: "#ffffff"
                                    },
                                }}>
                                    <ShoppingBagIcon />
                                </Badge>
                            </IconButton>
                            <Menu
                                id="menu-shoppingBag"
                                anchorEl={anchorElCart}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElCart)}
                                onClose={handleCloseCartMenu}
                                sx={{ display: "flex" }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={() => handleNavigate(page.path)}
                                    >
                                        <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

