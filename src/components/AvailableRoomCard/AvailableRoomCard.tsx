import { RoomAmenity } from "../../types/room";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
    Button,
} from "@mui/material";
import ChildCareIcon from '@mui/icons-material/ChildCare';
import Person2Icon from '@mui/icons-material/Person2';

interface AvailableRoomCardProps {
    roomPhotoUrl: string;
    roomType: string;
    capacityOfAdults: number;
    capacityOfChildren: number;
    roomAmenities: RoomAmenity[];
    price: number;
}

export default function AvailableRoomCard({
    roomPhotoUrl, roomType, capacityOfAdults, capacityOfChildren, roomAmenities, price
}: AvailableRoomCardProps) {
    return (
        <Card sx={{
            maxWidth: 345,
            borderRadius: 4,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
        }}>
            <CardMedia
                component="img"
                height="200"
                image={roomPhotoUrl}
                alt={"hotel picture"}
            />
            <CardContent>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography variant="h4" sx={{ fontSize: "20px" }}>{`${roomType} room`}</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        gap: "1rem"
                    }}>
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Person2Icon color="inherit" sx={{
                                fontSize: "30px",
                                border: "1px solid #DEDEDE",
                                borderRadius: "10px",
                                padding: "10px",
                                boxShadow: "rgba(0,0,0,0.8)"
                            }} />
                            <Typography sx={{ fontSize: "14px", color: "#5e6d77" }}>{`x${capacityOfAdults}`}</Typography>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            <ChildCareIcon color="inherit" sx={{
                                fontSize: "30px",
                                border: "1px solid #DEDEDE",
                                borderRadius: "10px",
                                padding: "10px"

                            }} />
                            <Typography sx={{ fontSize: "14px", color: "#5e6d77" }}>{`x${capacityOfChildren}`}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Box sx={{ display: "flex", mt: "10px", alignItems: "center" }}>
                        <Typography sx={{
                            fontWeight: "700",
                            fontSize: "16px",
                            color: "#1A2B48",
                        }}>
                            {`$${price}`}
                        </Typography>
                        <Typography sx={{
                            fontSize: "14px",
                            color: "#5e6d77",
                        }}>
                            /night
                        </Typography>
                    </Box>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "30px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            textTransform: "none",
                            width: "50%",
                            backgroundColor: "#174b71",
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}


