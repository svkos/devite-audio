import { StyleProp, Text as TextMantine, TextProps, useMatches } from "@mantine/core";
import { ReactNode } from "react";
import { useColors } from "theme/theme";

type FontVariants =
    | "title40"
    | "headline30"
    | "headline24"
    | "headline20"
    | "headline18"
    | "mobile18"
    | "mobile16";

type FontType = StyleProp<FontVariants>;

type FontColors = "black" | "grey800" | "grey600" | "grey400" | "white" | "aqua";

type Props = {
    variant: FontType;
    color?: FontColors;
    children: ReactNode;
    onClick?: () => void;
} & Omit<TextProps, "variant">;

const fontConfig: Record<FontVariants, TextProps> = {
    title40: { fz: 40, lh: "40px" },
    headline30: { fz: 30, lh: "36px" },
    headline24: { fz: 24, lh: "24px" },
    headline20: { fz: 20, lh: "30px" },
    headline18: { fz: 18, lh: "22px" },
    mobile18: { fz: 18, lh: "18px" },
    mobile16: { fz: 16, lh: "18px" },
};

export const Text = ({ variant, color = "black", children, ...props }: Props) => {
    const isResponsiveProp = typeof variant === "object";
    const colors = useColors();
    const text = useMatches(isResponsiveProp ? variant : {}) as FontVariants;
    const textType = isResponsiveProp ? text : (variant as FontVariants);
    const config = fontConfig[textType];

    return (
        <TextMantine {...config} c={colors[color]} {...props}>
            {children}
        </TextMantine>
    );
};
