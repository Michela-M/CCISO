import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Link,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError("");
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSnackbarMessage("Account created successfully!");
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setSnackbarMessage("Signed up with Google!");
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate("/");
            }, 2000); // Delay to let snackbar show before redirect
        } catch (err) {
            setError(err.message);
        }
    };

    return (
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
            <Card sx={{ width: 400 }}>
                <CardContent
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <Typography variant="h5">Sign up</Typography>
                    <Stack spacing={1}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        {/*<Typography variant="caption">
                            Password must be at least 8 characters long and
                            contain a letter and a number.
                        </Typography>*/}
                    </Stack>

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
                            onClick={handleSignup}
                        >
                            Sign up
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleSignup}
                        >
                            Sign up with Google
                        </Button>
                        <Typography>
                            Have an account? <Link href="/login">Log in</Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Signup;
