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
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleProvider } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
            "Password must contain at least one letter and one number",
        )
        .required("Required"),
    confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});

const Signup = () => {
    const [error, setError] = useState("");
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirm: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");
            if (values.password !== values.confirm) {
                setError("Passwords do not match");
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password,
                );
                const user = userCredential.user;

                // Create Firestore user document
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    role: "user", // manually change to "admin" in Firebase Console if needed
                });

                navigate("/", {
                    state: { message: "🎉 Account created successfully!" },
                });
            } catch (error) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setError("Email is already in use");
                        break;
                    default:
                        setError(error.message);
                }
            }
        },
    });

    const handleGoogleSignup = async () => {
        setLoadingGoogle(true);
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/", {
                state: { message: "🎉 Account created successfully!" },
            });
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
                    <Typography variant="h5">Sign up</Typography>
                    <Stack spacing={1}>
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
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
                            name="password"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
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
                        <TextField
                            label="Confirm password"
                            name="confirm"
                            variant="outlined"
                            fullWidth
                            type={showConfirmPassword ? "text" : "password"}
                            value={formik.values.confirm}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirm &&
                                Boolean(formik.errors.confirm)
                            }
                            helperText={
                                formik.touched.confirm && formik.errors.confirm
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                handleToggleConfirmPassword
                                            }
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
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
                        <Typography variant="caption">
                            Your password must be at least 8 characters long and
                            include a letter, a number, and a symbol.
                        </Typography>
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
                            Sign up
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleSignup}
                            loading={loadingGoogle}
                        >
                            Sign up with Google
                        </Button>
                        <Typography>
                            Have an account? <Link href="/login">Log in</Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;
