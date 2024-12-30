import React, { useState } from "react";
import { Box } from "@mui/material";
import ContentHeader from "../../../components/AdminDashboard/ContentHeader";
import CitiesTable from "../../../components/AdminDashboard/CitiesTable";
import AddCityDialog from "../../../components/AdminDashboard/AddCityDialog";

export default function ManageCities() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Box sx={{ height: "100%", width: "90%", margin: "10px 0px" }}>
            <ContentHeader
                title="Manage Cities"
                actionTitle="Add City"
                onActionClick={() => setOpenDialog(true)}
            />
            <CitiesTable />
            <AddCityDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Box>
    )
}
