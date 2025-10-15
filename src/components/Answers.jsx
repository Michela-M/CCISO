import React from "react";
import { List } from "@mui/material";
import Answer from "./Answer";

function Answers({
    currentQuestion,
    selectedOptionIndex,
    isConfirmed,
    handleOptionSelect,
}) {
    return (
        <List sx={{ width: "100%" }}>
            {currentQuestion.options.map((option, index) => {
                let status = "default";
                if (isConfirmed) {
                    if (index === currentQuestion.correctAnswerIndex) {
                        status = "success";
                    } else if (index === selectedOptionIndex) {
                        status = "error";
                    }
                }

                return (
                    <Answer
                        key={index}
                        label={option}
                        selected={selectedOptionIndex === index}
                        status={status}
                        onClick={() => handleOptionSelect(index)}
                    />
                );
            })}
        </List>
    );
}

export default Answers;
