import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addRoomToHotel } from "../../../services/adminService";
import { isTokenExpired } from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";

interface AddRoomDialogProps {
    open: boolean;
    onClose: () => void;
    hotelId: number;
}

export default function AddRoomDialog({ open, onClose, hotelId }: AddRoomDialogProps) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            roomNumber: "",
            cost: "",
        },
        validationSchema: Yup.object({
            roomNumber: Yup.string().required("Room number is required"),
            cost: Yup.number().required("Cost is required").positive("Cost must be positive"),
        }),
        onSubmit: async (values,{ resetForm }) => {
            const authToken = localStorage.getItem("authToken");

            if (!authToken || isTokenExpired(authToken)) {
                alert("Your session has expired. Please log in again.");
                navigate("/");
                return;
            }
            
            try {
                await addRoomToHotel(hotelId, {
                    roomNumber: values.roomNumber,
                    cost: Number(values.cost),
                });
                alert("Room added successfully!");
                resetForm();
                onClose();
            } catch (error) {
                console.error("Failed to add room:", error);
                alert("Failed to add room. Please try again.");
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add Room</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Room Number"
                        name="roomNumber"
                        value={formik.values.roomNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
                        helperText={formik.touched.roomNumber && formik.errors.roomNumber}
                        fullWidth
                    />
                    <TextField
                        label="Cost"
                        name="cost"
                        type="number"
                        value={formik.values.cost}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.cost && Boolean(formik.errors.cost)}
                        helperText={formik.touched.cost && formik.errors.cost}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ mr: 1, color: "#174b71" }}>
                    Cancel
                </Button>
                <Button onClick={formik.handleSubmit as any} variant="contained" sx={{backgroundColor: "#174b71",}}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
