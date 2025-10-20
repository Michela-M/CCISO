import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

import CsvUploader from "../components/CsvUploader";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
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
    }, []);

    const handleStartQuiz = () => {
        navigate("/loading");
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setIsAdmin(false);
        navigate("/");
    };

    return (
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
                }}
            >
                <Typography variant="h5">
                    Ready to test your knowledge?
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque tristique.
                </Typography>
                <Box display="flex" gap={2}>
                    <Button variant="contained" onClick={handleStartQuiz}>
                        Start quiz
                    </Button>
                    {isAdmin && <CsvUploader />}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
