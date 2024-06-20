"use client";

import useImage from "use-image";
import baseLeftImg from "./assets/base-left.png";
import bgLeftImg from "./assets/bg-left.png";
import topLeftImg from "./assets/top-left.png";
import baseRightImg from "./assets/base-right.png";
import bgRightImg from "./assets/bg-right.png";
import topRightImg from "./assets/top-right.png";
import { ConfiguratorView } from "./ConfiguratorView";
import { ConfiguratorConfig } from "./types";
import { Flex } from "@mantine/core";
import useDimensions from "../../utils/hooks/useDimensions";

const GAP = 20;

export const Configurator = ({ left: configLeft, right: configRight }: ConfiguratorConfig) => {
    const [ref, { width: widthContainer, height }] = useDimensions(true);
    const width = widthContainer / 2 - GAP / 2;

    const [bgLeft] = useImage(bgLeftImg.src);
    const [baseLeft] = useImage(baseLeftImg.src);
    const [topLeft] = useImage(topLeftImg.src);

    const [bgRight] = useImage(bgRightImg.src);
    const [baseRight] = useImage(baseRightImg.src);
    const [topRight] = useImage(topRightImg.src);

    if (!bgLeft || !baseLeft || !topLeft || !bgRight || !baseRight || !topRight) {
        return null;
    }

    const imagesLeft = {
        bg: { img: bgLeft },
        base: { img: baseLeft },
        top: { img: topLeft },
    };

    const imagesRight = {
        bg: { img: bgRight },
        base: { img: baseRight },
        top: { img: topRight },
    };

    return (
        <Flex w="100%" h="100%" gap={GAP} ref={ref}>
            {width && height && (
                <>
                    <ConfiguratorView
                        images={imagesLeft}
                        config={configLeft}
                        width={width}
                        height={height}
                    />

                    <ConfiguratorView
                        images={imagesRight}
                        config={configRight}
                        width={width}
                        height={height}
                    />
                </>
            )}
        </Flex>
    );
};
