import React, { useRef } from "react";
import Papa from "papaparse";
import { Button } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

const CsvUploader = () => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => fileInputRef.current.click();

    const formatQuestions = (data) => {
        return data
            .map((row) => {
                const entries = Object.values(row);

                // Expect exactly 6 columns: question + 4 options + correct answer
                if (entries.length < 6) return null;

                const [question, opt1, opt2, opt3, opt4, correctAnswerText] =
                    entries.map((entry) => entry.trim());

                // Build the options array
                const options = [opt1, opt2, opt3, opt4];

                // Find correct answer index
                const correctAnswerIndex = options.findIndex(
                    (opt) =>
                        opt.toLowerCase() === correctAnswerText.toLowerCase(),
                );

                // Handle missing or invalid data
                if (!question || correctAnswerIndex === -1) return null;

                return {
                    question,
                    options,
                    correctAnswerIndex,
                };
            })
            .filter(Boolean);
    };

    const saveToFirestore = async (formattedQuestions) => {
        try {
            const docRef = await addDoc(collection(db, "quizzes"), {
                questions: formattedQuestions,
                createdAt: new Date().toISOString(),
            });
            console.log("✅ Questions saved! Document ID:", docRef.id);
            alert("Questions uploaded successfully!");
        } catch (error) {
            console.error("❌ Error uploading to Firestore:", error);
            alert("Error uploading questions. Check the console.");
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
                const formatted = formatQuestions(results.data);
                console.log("✅ Formatted Questions:", formatted);
                saveToFirestore(formatted);
            },
            error: (err) => console.error("❌ Error parsing CSV:", err),
        });

        e.target.value = "";
    };

    return (
        <div className="p-4 border rounded-xl">
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />

            <Button
                variant="outlined"
                color="primary"
                onClick={handleButtonClick}
            >
                Upload questions
            </Button>
        </div>
    );
};

export default CsvUploader;
