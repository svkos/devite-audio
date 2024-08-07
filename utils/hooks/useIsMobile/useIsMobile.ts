import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MAIN_BREAKPOINT } from "@templates/constants";

export const useIsMobile = () => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints[MAIN_BREAKPOINT]})`);

    return isMobile;
};
