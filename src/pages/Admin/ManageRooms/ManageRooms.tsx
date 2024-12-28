import { Box } from "@mui/material";
import ContentHeader from "../../../components/AdminDashboard/ContentHeader";
import RoomsTable from "../../../components/AdminDashboard/RoomsTable";

export default function ManageRooms() {
    return (
        <Box sx={{ height: "100%", width: "90%", margin: "10px 0px" }}>
            <ContentHeader
                title="Manage Rooms"
                actionTitle="Add Room"
            />
            <RoomsTable />
        </Box>
    )
}