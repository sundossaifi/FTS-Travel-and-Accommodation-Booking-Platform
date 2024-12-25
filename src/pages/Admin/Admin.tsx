import { Box } from '@mui/material';
import Sidebar from '../../components/AdminDashboard/Sidebar';

export default function AdminPage() {
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