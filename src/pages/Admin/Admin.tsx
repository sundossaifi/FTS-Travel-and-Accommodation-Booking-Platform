import { Box} from '@mui/material';
import Sidebar from '../../components/AdminDashboard/Sidebar';

export default function AdminPage() {
    return (
        <Box sx={{ display: 'flex',bgcolor:"f7f8fa" ,height:"100vh"}}>
            <Sidebar  />
        </Box>
    );
}

