import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Alert, Snackbar } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

import CsvUploader from "../components/CsvUploader";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("info");
    const location = useLocation();
    const message = location.state?.message || "";

    const showSnackbar = (message, severity = "info") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        if (message) {
            showSnackbar(message, "success");
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    const role = userDoc.data().role;
                    setIsAdmin(role === "admin");
                }
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, [message]);

    const handleStartQuiz = () => {
        navigate("/loading");
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setIsAdmin(false);
        navigate("/");
        showSnackbar("Logged out successfully!", "info");
    };

    return (
        <>
            <Box sx={{ position: "relative", minHeight: "100vh" }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        display: "flex",
                        gap: 1,
                    }}
                >
                    {user ? (
                        <Button variant="outlined" onClick={handleLogout}>
                            Log out
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </Button>
                        </>
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        gap: 2,
                        textAlign: "center",
                        px: 4,
                    }}
                >
                    <Typography variant="h5">
                        Ready to test your knowledge?
                    </Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque tristique.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleStartQuiz}
                            sx={{
                                py: { xs: 1, sm: 1 },
                            }}
                        >
                            Start quiz
                        </Button>
                        {isAdmin && <CsvUploader />}
                    </Box>
                </Box>
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

export default Home;
