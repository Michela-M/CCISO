import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#06AED4",
        },
        error: {
            main: "#FF4405",
            dark: "#771A0D",
        },
        warning: {
            main: "#F79009",
        },
        success: {
            main: "#66C61C",
            dark: "#2B5314",
        },
        background: {
            default: "#181818",
            paper: "#26272B",
        },
        text: {
            primary: "#FFF",
        },
    },
    typography: {
        fontFamily: "Nunito, Arial, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    color: "#FFF",
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#26272B",
                    borderRadius: 1,
                    "&.Mui-selected": {
                        backgroundColor: "#3F3F46",
                        border: "1px solid",
                        //borderColor: "#2563EB",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#3F3F46",
                    },
                    "&:hover": {
                        backgroundColor: "#2E2F33",
                    },
                },
            },
        },
        /*MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1rem',
        },
      },
    },*/
    },
});

export default theme;
