import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Answers from "../components/Answers";
import { useNavigate } from "react-router-dom";
import sampleQuestions from "../data/sampleQuestions.json";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function QuizView() {
    const location = useLocation();
    const questions = location.state?.questions || sampleQuestions;

    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const currentQuestion = questions[currentIndex];

    const [correctAnswers, setCorrectAnswers] = useState(0);

    const handleConfirm = () => {
        if (selectedOptionIndex !== null) {
            setIsConfirmed(true);
            if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
                setCorrectAnswers((prev) => prev + 1);
            }
        }
    };

    const [difficultyCounts, setDifficultyCounts] = useState({
        easy: 0,
        good: 0,
        hard: 0,
    });

    const handleDifficulty = async (level) => {
        const updatedCounts = {
            ...difficultyCounts,
            [level]: difficultyCounts[level] + 1,
        };

        setDifficultyCounts(updatedCounts);

        const auth = getAuth();
        const user = auth.currentUser;

        if (user && currentQuestion?.id) {
            const ratingDocId = `${user.uid}_${currentQuestion.id}`;
            const ratingRef = doc(collection(db, "userRatings"), ratingDocId);

            try {
                await setDoc(ratingRef, {
                    userId: user.uid,
                    questionId: currentQuestion.id,
                    rating: level,
                    timestamp: new Date().toISOString(),
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Error saving rating:", error);
            }
        }

        if (currentIndex < questions.length - 1) {
            handleNext();
        } else {
            navigate("/results", {
                state: {
                    correctAnswers,
                    totalQuestions: questions.length,
                    difficultyCounts: updatedCounts,
                },
            });
        }
    };

    const handleOptionSelect = (index) => {
        if (!isConfirmed) {
            setSelectedOptionIndex(index);
        }
    };

    const handleNext = () => {
        setSelectedOptionIndex(null);
        setIsConfirmed(false);
        setCurrentIndex((prev) => prev + 1);
    };

    return (
        <>
            <AppBar position="static" color="primary" sx={{ mb: 4 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate("/")}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, textAlign: "center" }}
                    >
                        Question {currentIndex + 1} of {questions.length}
                    </Typography>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2 }}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                    width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
                    margin: "0 auto",
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "1.25rem", sm: "2rem", md: "2.5rem" },
                        fontWeight: "bold",
                    }}
                >
                    {currentQuestion.question}
                </Typography>

                <Answers
                    currentQuestion={currentQuestion}
                    selectedOptionIndex={selectedOptionIndex}
                    isConfirmed={isConfirmed}
                    handleOptionSelect={handleOptionSelect}
                />

                <Box sx={{ mt: 2 }}>
                    {!isConfirmed ? (
                        <Button
                            variant="contained"
                            onClick={handleConfirm}
                            disabled={selectedOptionIndex === null}
                        >
                            Confirm
                        </Button>
                    ) : (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleDifficulty("easy")}
                            >
                                Easy
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => handleDifficulty("good")}
                            >
                                Good
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDifficulty("hard")}
                            >
                                Hard
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default QuizView;
