import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface CartCardProps {
    roomId: string;
    roomType: string;
    price: number;
    roomPhotoUrl: string;
    removeFromCart: (id: string) => void;
}

export default function CartCard({ roomId, roomType, price, roomPhotoUrl,removeFromCart }: CartCardProps) {
    return (
        <Box
            key={roomId}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: 2,
            }}
        >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <img
                    src={roomPhotoUrl}
                    alt={roomType}
                    width={50}
                    height={50}
                    style={{ borderRadius: "8px" }}
                />
                <Box>
                    <Typography variant="body1">{roomType}</Typography>
                    <Typography variant="body2">{`$${price}`}</Typography>
                </Box>
            </Box>
            <IconButton onClick={() => removeFromCart(roomId)} color="error">
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}