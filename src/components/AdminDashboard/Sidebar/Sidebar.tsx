import { useTheme } from '@mui/material/styles';
import {
    Box,
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon

} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LogoutDialog from '../../LogoutDialog';
import { useState } from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';


export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const menuItems = [
        {
            text: 'Manage Hotels',
            icon: <ApartmentIcon />,
            link: '/admin/manage-hotels',
        },
        {
            text: 'Manage Cities',
            icon: <LocationOnIcon />,
            link: '/admin/manage-cities',
        },
        {
            text: 'Manage Rooms',
            icon: <AirlineSeatFlatIcon />,
            link: '/admin/manage-rooms',
        },
    ];

    const drawerWidth = 240;

    const navigate = useNavigate();

    function handleLogoutConfirm() {
        localStorage.removeItem('authToken');
        setLogoutDialogOpen(false);
        navigate('/');
    }

    function handleLogoutCancel() {
        setLogoutDialogOpen(false);
    }

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(open && {
                        width: `calc(100% - ${drawerWidth}px)`,
                        marginLeft: `${drawerWidth}px`,
                        transition: theme.transitions.create(['margin', 'width'], {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    }),
                    backgroundColor: '#fff',
                    color: '#000000',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!open && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        {!open && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FlightTakeoffIcon sx={{ mr: 1 }} />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    sx={{
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
                        )}
                    </Box>
                    <IconButton
                        color="inherit"
                        onClick={() => setLogoutDialogOpen(true)}
                        edge="end"
                    >
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#174b71',
                        color: '#fff',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: theme.spacing(0, 1),
                        justifyContent: 'flex-end',
                        ...theme.mixins.toolbar,
                    }}
                >
                    <Box sx={{ display: 'flex' }}>
                        <FlightTakeoffIcon sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
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
                    <IconButton sx={{ color: "#fff" }} onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton component={Link} to={item.link}>
                                <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: theme.spacing(3),
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    marginLeft: `-${drawerWidth}px`,
                    ...(open && {
                        marginLeft: 0,
                        transition: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    }),
                }}
            >
                <Box sx={{ ...theme.mixins.toolbar }} />
                <Outlet />
            </Box>
            <LogoutDialog
                open={logoutDialogOpen}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />
        </Box>
    );
}
