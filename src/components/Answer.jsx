import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";

const statusColors = {
    default: "background.paper",
    success: "success.dark",
    error: "error.dark",
};

function Answer({ label, selected, status = "default", onClick }) {
    const getBackgroundColor = () => {
        if (status === "success") return statusColors.success;
        if (status === "error") return statusColors.error;
        if (selected) return "#3F3F46"; // your custom selected color
        return statusColors.default;
    };

    return (
        <ListItemButton
            onClick={onClick}
            sx={{
                backgroundColor: getBackgroundColor(),
                borderRadius: 1,
                color: "#fff",
                "&:hover": {
                    backgroundColor: selected ? "#3F3F46" : "#2E2F33",
                },
                mb: 1,
            }}
        >
            <ListItemText primary={label} />
        </ListItemButton>
    );
}

export default Answer;
