import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface ContentHeaderProps {
    title: string;
    actionTitle: string;
    onActionClick?: () => void; // Optional callback for button click
}

export default function ContentHeader({ title, actionTitle, onActionClick }: ContentHeaderProps) {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "0px 20px"
        }}>
            <Typography variant="h5">{title}</Typography>
            <Button
                startIcon={<AddIcon />}
                type="button"
                variant="contained"
                color="primary"
                onClick={onActionClick} 
                sx={{
                    borderRadius: "10px",
                    padding: "5px 15px",
                    fontSize: "16px",
                    textTransform: "none",
                    backgroundColor: "#174b71",
                }}
            >
                {actionTitle}
            </Button>
        </Box>
    );
}
