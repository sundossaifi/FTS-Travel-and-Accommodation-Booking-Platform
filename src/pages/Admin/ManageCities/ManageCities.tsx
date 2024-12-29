import { Box } from "@mui/material";
import ContentHeader from "../../../components/AdminDashboard/ContentHeader";
import CitiesTable from "../../../components/AdminDashboard/CitiesTable";

export default function ManageCities() {
    return (
        <Box sx={{ height: "100%", width: "90%", margin: "10px 0px" }}>
            <ContentHeader
                title="Manage Hotels"
                actionTitle="Add Hotel"
            />
            <CitiesTable />
        </Box>
    )
}