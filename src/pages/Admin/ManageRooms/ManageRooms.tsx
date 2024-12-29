import { Box } from "@mui/material";
import ContentHeader from "../../../components/AdminDashboard/ContentHeader";
import RoomsTable from "../../../components/AdminDashboard/RoomsTable";
import { useState } from "react";
import AddRoomDialog from "../../../components/AdminDashboard/AddRoomDialog";

export default function ManageRooms() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

    function handleAddRoomClick() {
        setIsDialogOpen(true);
    }
    function handleDialogClose() {
        setIsDialogOpen(false);
    }

    return (
        <Box sx={{ height: "100%", width: "90%", margin: "10px 0px" }}>
            <ContentHeader
                title="Manage Rooms"
                actionTitle="Add Room"
                onActionClick={handleAddRoomClick}
            />
            <RoomsTable onSelectHotel={setSelectedHotelId} />
            {selectedHotelId && (
                <AddRoomDialog
                    open={isDialogOpen}
                    onClose={handleDialogClose}
                    hotelId={selectedHotelId}
                />
            )}
        </Box>
    )
}