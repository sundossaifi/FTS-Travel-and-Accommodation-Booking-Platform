import HotelsTable from "../../../components/AdminDashboard/HotelsTable";
import ContentHeader from "../../../components/AdminDashboard/ContentHeader";
import { Box } from "@mui/material";

export default function ManageHotels() {
    return (
        <Box sx={{ height: "100%", width: "90%",margin:"10px 0px" }}>
            <ContentHeader title="Manage Hotels" actionTitle="Add Hotel" />
            <HotelsTable />
        </Box>
    )
}