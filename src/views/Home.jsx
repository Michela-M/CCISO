import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CsvUploader from "../components/CsvUploader";
import { fetchLatestQuiz } from "../utils/fetchLatestQuiz";

const Home = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate("/loading");
    };

    return (
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
            <Typography variant="h5">Ready to test your knowledge?</Typography>
            <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                tristique.
            </Typography>
            <Box display="flex" gap={2}>
                <Button variant="contained" onClick={handleStartQuiz}>
                    Start quiz
                </Button>
                <CsvUploader />
            </Box>
        </Box>
    );
};

export default Home;
