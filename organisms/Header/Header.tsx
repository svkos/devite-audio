import logo from "@assets/logo.svg";
import { Box } from "@mantine/core";
import { MAIN_BREAKPOINT } from "@templates/constants";
import Image from "next/image";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";

export const Header = () => {
    const isMobile = useIsMobile();

    return (
        <Box
            bg="black"
            py={8}
            h={{ [MAIN_BREAKPOINT]: 80, base: 60 }}
            px={{ [MAIN_BREAKPOINT]: 44, base: 16 }}
        >
            <Image src={logo} alt="Devite Audio" height={isMobile ? 44 : 64} />
        </Box>
    );
};
