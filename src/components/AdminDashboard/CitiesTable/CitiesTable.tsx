import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    TextField,
    Box,
    CircularProgress,
    IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchCitiesList } from "../../../services/adminService";
import { City } from "../../../types/admin";

export default function CitiesTable() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        async function loadCities() {
            setLoading(true);
            try {
                const data = await fetchCitiesList(rowsPerPage, page + 1);
                setCities(data);
                setHasMore(data.length === rowsPerPage);
            } catch (error) {
                console.error("Failed to fetch cities", error);
            } finally {
                setLoading(false);
            }
        }
        loadCities();
    }, [rowsPerPage, page]);

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
        setPage(0);
    }

    function handlePageChange(_: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Paper sx={{ mt: "20px", width: "100%", borderRadius: "16px" }}>
            <Box sx={{ display: "flex", mb: 2, p: "20px 0px 0px 20px", gap: "5px", width: "100%" }}>
                <TextField
                    variant="outlined"
                    placeholder="Search cities..."
                    value={search}
                    onChange={handleSearchChange}
                    fullWidth
                    sx={{ maxWidth: 300 }}
                    InputProps={{
                        startAdornment: (
                            <SearchIcon sx={{ mr: 1, color: "gray" }} />
                        ),
                    }}
                />
            </Box>
            <TableContainer>
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 200,
                        }}
                    >
                        <CircularProgress sx={{ color: "#174b71" }} />
                    </Box>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "lightgray" }}>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCities.map((city) => (
                                <TableRow key={city.id}>
                                    <TableCell>{city.name}</TableCell>
                                    <TableCell>{city.description}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                slotProps={{
                    actions: {
                        nextButton: {
                            disabled: !hasMore,
                        },
                    },
                }}
            />
        </Paper>
    )
}
