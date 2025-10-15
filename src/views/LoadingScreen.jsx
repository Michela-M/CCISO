// src/pages/LoadingPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Typography, CircularProgress } from "@mui/material";

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const q = query(
                    collection(db, "quizzes"),
                    orderBy("createdAt", "desc"),
                    limit(1),
                );
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    console.error("No quizzes found!");
                    return;
                }

                const quizDoc = snapshot.docs[0].data();
                const fetchedQuestions = quizDoc.questions;

                const shuffleArray = (array) => {
                    const shuffled = [...array]; // copy array to avoid mutating original
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
                    }
                    return shuffled;
                };
                // Shuffle the questions
                const questions = shuffleArray(fetchedQuestions);

                console.log("Fetched questions:", questions);

                // Simulate loading delay if needed
                setTimeout(() => {
                    navigate("/question", { state: { questions } });
                }, 2000); // 2 seconds delay
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        };

        fetchQuestions();
    }, [navigate]);

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading quiz...
            </Typography>
        </Box>
    );
};

export default LoadingPage;
