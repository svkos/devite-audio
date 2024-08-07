import { createTheme, useMantineTheme } from "@mantine/core";
import { futuraPT } from "./font/Futura";

export const useColors = () => {
    const theme = useMantineTheme();
    return {
        black: theme.colors["devite-main"][0],
        grey800: theme.colors["devite-main"][1],
        grey600: theme.colors["devite-main"][2],
        grey400: theme.colors["devite-main"][3],
        white: theme.colors["devite-main"][4],
        aqua: theme.colors["devite-main"][5],
    };
};

export const theme = createTheme({
    fontFamily: futuraPT.style.fontFamily,
    cursorType: "pointer",
    colors: {
        "devite-main": [
            "#1A1A1A", // black
            "#9A9A9A", // grey 800
            "#B8B8B9", // grey 600
            "#C4C4C4", // grey 400
            "#FFFFFF", // white
            "#46B5CE", // aqua
            "",
            "",
            "",
            "",
        ],
    },
});
