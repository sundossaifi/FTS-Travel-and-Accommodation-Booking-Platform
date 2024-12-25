import { Box, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface ContentHeaderProps {
    title: string;
    actionTitle: string;
}

export default function ContentHeader({ title, actionTitle }: ContentHeaderProps) {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            p:"0px 20px"
        }}>
            <Typography variant="h5">{title}</Typography>
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
                {actionTitle}
            </Button>
        </Box>
    )
}