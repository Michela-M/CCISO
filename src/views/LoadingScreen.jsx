// src/pages/LoadingPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
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
                const allQuestions = quizDoc.questions;

                const auth = getAuth();
                const user = auth.currentUser;

                let ratingsMap = {};
                if (user) {
                    ratingsMap = await fetchUserRatings(user.uid);
                }

                const weights = {
                    hard: 3,
                    good: 2,
                    easy: 1,
                };

                // Build weighted pool
                const weightedPool = [];
                allQuestions.forEach((q) => {
                    const rating = ratingsMap[q.id] || "good"; // default if unrated
                    const weight = weights[rating];
                    for (let i = 0; i < weight; i++) {
                        weightedPool.push(q);
                    }
                });

                // Shuffle and select
                const shuffleArray = (array) => {
                    const shuffled = [...array];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    return shuffled;
                };

                const questions = shuffleArray(weightedPool).slice(0, 10);

                console.log("Personalized questions:", questions);

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

    const fetchUserRatings = async (userId) => {
        const ratingsSnapshot = await getDocs(
            query(collection(db, "userRatings")),
        );

        const ratingsMap = {};
        ratingsSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.userId === userId) {
                ratingsMap[data.questionId] = data.rating;
            }
        });

        return ratingsMap;
    };

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
