import { Box, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function ManageRooms() {
    return (
        <div>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography variant="h5">
                    Manage Rooms
                </Typography>
                <Button
                    startIcon={<AddIcon />}
                    type="button"
                    variant="contained"
                    color="primary"
                    // onClick={applyFilters}
                    sx={{
                        borderRadius: "10px",
                        padding: "5px 15px",
                        fontSize: "16px",
                        textTransform: "none",
                        backgroundColor: "#174b71",
                    }}>
                        Add room
                </Button>
            </Box>
        </div>
    )
}