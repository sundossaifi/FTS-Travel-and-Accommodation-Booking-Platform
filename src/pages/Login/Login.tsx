import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authenticateUser } from "../../services/authService";
import { AuthResponse } from "../../types/auth";

interface LoginFormValues {
    userName: string;
    password: string;
}

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(4, "Username must be at least 4 characters")
                .required("Username is required"),
            password: Yup.string()
                .min(4, "Password must be at least 4 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                setError(null);
                setLoading(true);

                const { userType, authentication }: AuthResponse = await authenticateUser(
                    values.userName,
                    values.password
                );

                console.log("Authentication successful:", { userType, authentication });

                localStorage.setItem("authToken", authentication);

                if (userType === "User") {
                    navigate("/home");
                } else if (userType === "Admin") {
                    navigate("/admin");
                }
            } catch (err) {
                setError("Invalid username or password");
                console.error("Error during authentication:", err);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    mt: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "#174b71" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Login</Typography>
                <Box sx={{ mt: 1, width: "100%" }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            name="userName"
                            label="Username"
                            autoFocus
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: "#174b71",
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "white" }} />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container >
    );
}
