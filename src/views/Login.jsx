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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
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
                    <Typography variant="h5">Log in</Typography>
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
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Link>Forgot password?</Link>
                        </Box>
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
                            onClick={handleLogin}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                        >
                            Log in with Google
                        </Button>
                        <Typography>
                            Don't have an account?{" "}
                            <Link href="/signup">Sign up</Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
