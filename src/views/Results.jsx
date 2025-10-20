import React from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Results() {
    const { state } = useLocation();
    const { correctAnswers, totalQuestions, difficultyCounts } = state || {};

    const data = {
        labels: ["Easy", "Good", "Hard"],
        datasets: [
            {
                data: [
                    difficultyCounts?.easy || 0,
                    difficultyCounts?.good || 0,
                    difficultyCounts?.hard || 0,
                ],
                backgroundColor: ["#66C61C", "#F79009", "#FF4405"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "70%", // tighter ring
        animation: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "white",
                },
            },
        },
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
            <Card sx={{ minWidth: 600 }}>
                <CardContent>
                    <Typography variant="h5">Quiz completed!</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Score: {correctAnswers}/{totalQuestions}
                    </Typography>
                    <Box sx={{ maxWidth: 300, mx: "auto" }}>
                        <Doughnut data={data} options={options} />
                    </Box>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="outlined" href="/">
                        Home
                    </Button>
                    <Button variant="contained" href="/loading">
                        Start again
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Results;
