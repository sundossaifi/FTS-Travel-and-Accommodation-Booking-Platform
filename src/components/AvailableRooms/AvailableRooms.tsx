import { Box, Grid2, Typography } from "@mui/material";
import { Room } from "../../types/room";
import AvailableRoomCard from "../AvailableRoomCard";

interface AvailableRoomsProps {
    rooms: Room[];
}
export default function AvailableRooms({ rooms }: AvailableRoomsProps) {
    return (
            <Box sx={{
                width: "100%",
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'flex-start',
                alignItems:{xs:"center",md:"unset"},
                mt:"3rem"
            }}>
                <Typography variant="h2" gutterBottom sx={{
                    fontSize: "26px",
                    fontWeight: "700",
                    lineHeight: "36px",
                    mb:"2rem"
                }}>
                    Available Rooms
                </Typography>
                <Grid2 container spacing={{ xs: 2, md: 3 }} alignItems={'center'} >
                    {rooms.map((room) => (
                        <Grid2 key={room.roomId} size={{ xs: 12, sm: 6, md: 4 }}>
                            <AvailableRoomCard
                                roomPhotoUrl={room.roomPhotoUrl}
                                roomType={room.roomType}
                                capacityOfAdults={room.capacityOfAdults}
                                capacityOfChildren={room.capacityOfChildren}
                                roomAmenities={room.roomAmenities}
                                price={room.price}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
    )
}