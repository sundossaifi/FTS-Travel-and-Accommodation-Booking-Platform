import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCity } from "../../../services/adminService";

interface AddCityDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddCityDialog({ open, onClose }: AddCityDialogProps) {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("City name is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await addCity(values);
                alert("City added successfully!");
                resetForm();
                onClose(); 
            } catch (error) {
                alert("Failed to add city. Please try again.");
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add City</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="City Name"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <DialogActions>
                        <Button onClick={onClose} sx={{ color: "#174b71" }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#174b71",
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}
