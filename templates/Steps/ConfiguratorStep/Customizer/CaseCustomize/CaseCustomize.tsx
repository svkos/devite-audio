import ColorPicker, { Colors, colorTitles } from "@atoms/ColorPicker/ColorPicker";
import { Flex } from "@mantine/core";
import { useConfigState, useOrderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { useCallback } from "react";
import { caseColors } from "./constants";

export const CaseCustomize = () => {
    const [{ currentSide }, { setLROrder }] = useOrderState();
    const { setBackground } = useConfigState();

    const onClick = useCallback(
        (color: Colors) => {
            setLROrder("caseColor", { name: colorTitles[color], color });
            setBackground(color);
        },
        [setLROrder, setBackground],
    );

    return (
        <Flex
            align="center"
            wrap="wrap"
            style={{ overflow: "scroll" }}
            gap={{ base: 6, [MAIN_BREAKPOINT]: 12 }}
        >
            {caseColors.map((color) => (
                <ColorPicker
                    key={color}
                    color={color}
                    isActive={currentSide.caseColor.color === color}
                    onClick={onClick}
                />
            ))}
        </Flex>
    );
};
