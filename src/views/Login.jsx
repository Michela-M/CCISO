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
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
});

const Login = () => {
    const [error, setError] = useState("");
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");
            try {
                await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password,
                );
                navigate("/", {
                    state: { message: "🎉 Logged in successfully!" },
                });
            } catch (error) {
                switch (error.code) {
                    case "auth/wrong-password":
                        return "Invalid email or password. Please try again.";
                    case "auth/user-not-found":
                        return "Invalid email or password. Please try again.";
                    case "auth/invalid-email":
                        return "Please enter a valid email address.";
                    case "auth/too-many-requests":
                        return "Too many attempts. Please wait a moment before trying again.";
                    case "auth/network-request-failed":
                        return "Network error. Please check your connection and try again.";
                    case "auth/user-disabled":
                        return "This account has been disabled. Contact support for help.";
                    default:
                        return "An unexpected error occurred. Please try again.";
                }
            }
        },
    });

    const handleGoogleLogin = async () => {
        setLoadingGoogle(true);
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/", { state: { message: "🎉 Logged in successfully!" } });
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
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <Card sx={{ width: { xs: "90%", sm: "400px" }, mx: "auto" }}>
                <CardContent
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <Typography variant="h5">Log in</Typography>
                    <Stack spacing={1}>
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
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleTogglePassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Link
                                component={RouterLink}
                                to="/forgot-password"
                                underline="hover"
                            >
                                Forgot password?
                            </Link>
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
                            type="submit"
                            loading={loading}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                            loading={loadingGoogle}
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
