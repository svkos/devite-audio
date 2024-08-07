import check from "@assets/check.png";
import { Flex } from "@mantine/core";
import { MAIN_BREAKPOINT } from "@templates/constants";
import Image from "next/image";
import { useColors } from "theme/theme";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";

export enum Colors {
    Transparent = "",
    Black = "#000000",
    White = "#ffffff",
    Red = "#ab1a0c",
    Pink = "#c83053",
    Orange = "#c74a1c",
    Yellow = "#dbd841",
    Green = "#21b55c",
    Turquoise = "#24b587",
    Blue = "#2697b3",
    DeepBlue = "#1557ad",
    Indigo = "#3733b0",
    Purple = "#6e2496",
    Beige = "#f0e9da",
    GreenSolid = "#39963c",
    BlueSolid = "#6ec9c7",
    DeepBlueSolid = "#1028a3",
}

export const colorTitles = {
    [Colors.Transparent]: "Прозрачный",
    [Colors.Black]: "Черный",
    [Colors.White]: "Белый",
    [Colors.Blue]: "Голубой",
    [Colors.DeepBlue]: "Синий",
    [Colors.Indigo]: "Индиго",
    [Colors.Purple]: "Фиолетовый",
    [Colors.Red]: "Красный",
    [Colors.Pink]: "Розовый",
    [Colors.Orange]: "Оранжевый",
    [Colors.Yellow]: "Желтый",
    [Colors.Green]: "Зеленый",
    [Colors.Turquoise]: "Бирюзовый",
    [Colors.Beige]: "Бежевый",
    [Colors.GreenSolid]: "Зеленый",
    [Colors.BlueSolid]: "Голубой",
    [Colors.DeepBlueSolid]: "Синий",
};

type Props = {
    color: Colors;
    isActive: boolean;
    onClick: (color: Colors) => void;
};

const ColorPicker = ({ isActive, color, onClick }: Props) => {
    const isMobile = useIsMobile();
    const colors = useColors();

    return (
        <Flex
            p={12}
            h={{ base: 60, [MAIN_BREAKPOINT]: 72 }}
            w={{ base: 60, [MAIN_BREAKPOINT]: 72 }}
            align="center"
            justify="center"
        >
            <Flex
                h={{ base: 48, [MAIN_BREAKPOINT]: 58 }}
                w={{ base: 48, [MAIN_BREAKPOINT]: 58 }}
                style={{
                    ...(isActive && {
                        boxShadow: `0 0 0 ${isMobile ? "2px" : "3px"} white, 0 0 0 ${isMobile ? "5px" : "7px"} ${isMobile ? colors.black : colors.grey800}`,
                    }),
                    borderRadius: "50%",
                    cursor: "pointer",
                    ...(color === Colors.Transparent && {
                        border: "1px dashed #7f7f7f",
                    }),
                    ...(color === Colors.White && { border: "1px solid #ccc" }),
                    flexShrink: 0,
                }}
                bg={color}
                onClick={() => onClick(color)}
                align="center"
                justify="center"
            >
                {isActive && <Image src={check} alt="" />}
            </Flex>
        </Flex>
    );
};

export default ColorPicker;
