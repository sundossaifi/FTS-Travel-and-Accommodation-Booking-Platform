import { Box } from '@mui/material';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/admin/manage-hotels');
    }, [navigate]);
    
    return (
        <Box sx={{
            display: 'flex',
            bgcolor: "f7f8fa",
            minHeight: "100vh",
            overflowX: "hidden",
            overflowY: "auto"
        }}>
            <Sidebar />
        </Box>
    )
}