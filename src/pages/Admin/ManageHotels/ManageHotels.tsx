import { useState } from "react";
import { Box } from "@mui/material";
import HotelsTable from "../../../components/AdminDashboard/HotelsTable";
import ContentHeader from "../../../components/AdminDashboard/ContentHeader";
import AddHotelDialog from "../../../components/AdminDashboard/AddHotelDialog";

export default function ManageHotels() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Box sx={{ height: "100%", width: "90%", margin: "10px 0px" }}>
            <ContentHeader
                title="Manage Hotels"
                actionTitle="Add Hotel"
                onActionClick={() => setOpenDialog(true)}
            />
            <HotelsTable />
            <AddHotelDialog open={openDialog} onClose={() => setOpenDialog(false)} />
        </Box>
    )
}
