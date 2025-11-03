import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Alert,
    Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
});

const ForgotPassword = () => {
    const [error, setError] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("info");

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setError("");
            try {
                await sendPasswordResetEmail(auth, values.email);
                setSnackbarMessage(
                    "Password reset email sent! Please check your inbox.",
                );
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (err) {
                switch (err.code) {
                    case "auth/user-not-found":
                        setSnackbarMessage("No account found with this email.");
                        setSnackbarSeverity("error");
                        setSnackbarOpen(true);
                        break;
                    default:
                        setError(
                            "Failed to send password reset email. Please try again.",
                        );
                }
            }
        },
    });

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    width: "100%",
                }}
            >
                <Card sx={{ width: { xs: "90%", sm: "400px" }, mx: "auto" }}>
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography variant="h5">Forgot Password</Typography>
                        <Typography variant="body2">
                            Enter your email address to receive password reset
                            instructions.
                        </Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name="email"
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={formik.handleSubmit}
                            >
                                Send Reset Instructions
                            </Button>
                            <Button variant="outlined" fullWidth href="/login">
                                Back
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ForgotPassword;
