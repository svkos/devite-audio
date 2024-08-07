/* eslint-disable react-hooks/rules-of-hooks */
import { ButtonProps as MantineButtonProps, Button as MantineButton, Flex } from "@mantine/core";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useColors } from "theme/theme";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";

type Props = {
    isActive?: boolean;
    mode: "v1" | "v2";
} & MantineButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement>;

const _Button = ({ isActive, mode, ...rest }: Props) => {
    const colors = useColors();
    const isMobile = useIsMobile();

    const config: MantineButtonProps = (() => {
        switch (mode) {
            case "v1":
                return {
                    h: isMobile ? 34 : 48,
                    variant: "transparent",
                    px: 0,
                    loaderProps: { color: colors.aqua, size: "lg" },
                };
            case "v2":
                return {
                    h: isMobile ? 32 : 52,
                    variant: "transparent",
                    style: {
                        borderBottom: `1px solid ${colors[isActive ? "black" : "grey600"]}`,
                        borderRadius: 0,
                    },
                    px: 0,
                    mx: -1,
                    pb: isMobile ? 0 : 11,
                };
        }
    })();

    return <MantineButton {...config} {...rest} />;
};

const _Round = ({ children }: { children: ReactNode }) => {
    const colors = useColors();
    return (
        <Flex
            align="center"
            justify="center"
            style={{ border: `2px solid ${colors["grey600"]}`, borderRadius: "50%" }}
            w={{ base: 32, [MAIN_BREAKPOINT]: 46 }}
            h={{ base: 32, [MAIN_BREAKPOINT]: 46 }}
        >
            {children}
        </Flex>
    );
};

const Button = Object.assign(_Button, {
    Round: _Round,
});

export default Button;
