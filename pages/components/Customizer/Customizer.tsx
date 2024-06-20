import { Box, Button, Flex, Select } from "@mantine/core";
import {
    ConfiguratorColor,
    ConfiguratorConfig,
    ConfiguratorItemConfig,
} from "../Configurator/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

enum Transparency {
    Transparency = "transparency",
    Solid = "solid",
}

const transparencyMap = {
    [Transparency.Transparency]: 0.3,
    [Transparency.Solid]: 0.8,
};

enum Colors {
    Blue = "blue",
    Green = "green",
    Red = "red",
}

const colors = {
    blue: {
        red: 0,
        blue: 201,
        green: 0,
    },
    green: {
        red: 0,
        blue: 1,
        green: 200,
    },
    red: {
        red: 201,
        blue: 0,
        green: 0,
    },
};

type Props = {
    setConfig: Dispatch<SetStateAction<ConfiguratorConfig>>;
};

export const Customizer = ({ setConfig }: Props) => {
    const [leftRight, setLeftRight] = useState<"left" | "right">("left");
    const [value, setValue] = useState<"top" | "bg">("top");
    const [transparency, setTransparency] = useState<Transparency>(Transparency.Transparency);
    const [color, setColor] = useState<Colors>();

    // const onClickColor = (color: Colors) => {
    //     value === "Крышка" ? setTop(colors[color]) : setBg(colors[color]);
    // };

    // const onChangeTransparency = (val) => {
    //     if (value2 === "Transparency") {
    //         value === "Крышка" ? setTop({ opacity: 0.1 }) : setBg({ opacity: 0.1 });
    //     } else {
    //         value === "Крышка" ? setTop({ opacity: 1 }) : setBg({ opacity: 1 });
    //     }

    //     setValue2(val);
    // };

    useEffect(() => {
        console.log("object");
        color &&
            setConfig((prev: ConfiguratorConfig) => ({
                ...prev,
                [leftRight]: {
                    ...prev[leftRight],
                    [value]: {
                        ...colors[color],
                        opacity: transparencyMap[transparency],
                    },
                },
            }));
    }, [color, value, transparency, setConfig, leftRight]);

    return (
        <Flex gap={20} direction="column">
            <Flex gap={10}>
                <Button
                    color={leftRight === "left" ? "green" : "gray"}
                    onClick={() => setLeftRight("left")}
                >
                    L
                </Button>
                <Button
                    color={leftRight === "right" ? "green" : "gray"}
                    onClick={() => setLeftRight("right")}
                >
                    R
                </Button>
            </Flex>

            <Select value={value} label="бла бла" onChange={setValue} data={["top", "bg"]} />

            <Select
                value={transparency}
                label="Прозрачность"
                onChange={setTransparency}
                data={[Transparency.Transparency, Transparency.Solid]}
            />

            <Flex gap={10}>
                {Object.values(Colors).map((color) => (
                    <Box
                        key={color}
                        h={60}
                        w={60}
                        style={{ borderRadius: "50%", cursor: "pointer" }}
                        bg={color}
                        onClick={() => setColor(color)}
                    />
                ))}
            </Flex>
        </Flex>
    );
};
