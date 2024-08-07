"use client";

import logoGold from "@assets/logo-gold.png";
import logoMetal from "@assets/logo-metal.png";
import { Box } from "@mantine/core";
import { phonesConfigState } from "@store/store";
import { LogoDeviteColor } from "@type/all";
import Konva from "konva";
import { ForwardedRef } from "react";
import { Layer, Stage } from "react-konva";
import { useRecoilValue } from "recoil";
import useImage from "use-image";
import useDimensions from "utils/hooks/useDimentions/useDimentions";
import baseLeftImg from "./assets/base-left.png";
import baseRightImg from "./assets/base-right.png";
import baseTopLeftImg from "./assets/base-top-left.png";
import baseTopRightImg from "./assets/base-top-right.png";
import bgLeftImg from "./assets/bg-left.png";
import bgRightImg from "./assets/bg-right.png";
import knowlesLeftImg from "./assets/knowles-left.png";
import knowlesRightImg from "./assets/knowles-right.png";
import topLeftImg from "./assets/top-left.png";
import topRightImg from "./assets/top-right.png";
import { ConfiguratorTexture } from "./components/ConfiguratorTexture";
import { ConfiguratorView } from "./components/ConfiguratorView";
import {
    BASE_STAGE_HEIGHT,
    BASE_STAGE_WIDTH,
    clipLeftFunction,
    clipRightFunction,
    getLayerOffset,
    getLayerScale,
    LEFT_PHONE_WIDTH,
    X_CENTER_LEFT,
    X_CENTER_RIGHT,
    Y_CENTER_LEFT,
    Y_CENTER_RIGHT,
} from "./helper";

export const Configurator = ({ stageRef }: { stageRef?: ForwardedRef<Konva.Stage> }) => {
    const currentSide = useRecoilValue(phonesConfigState).currentSide;
    const configLeft = useRecoilValue(phonesConfigState).left;
    const configRight = useRecoilValue(phonesConfigState).right;

    const [wrapperRef, { width: widthContainer }] = useDimensions();
    const width = widthContainer ?? BASE_STAGE_WIDTH;

    const scale = width / BASE_STAGE_WIDTH;

    const stageWidth = BASE_STAGE_WIDTH * scale;
    const stageHeight = BASE_STAGE_HEIGHT * scale;
    const stageScale = { x: scale, y: scale };

    const [bgLeft] = useImage(bgLeftImg.src);
    const [baseLeft] = useImage(baseLeftImg.src);
    const [topLeft] = useImage(topLeftImg.src);
    const [baseTopLeft] = useImage(baseTopLeftImg.src);
    const [knowlesLeft] = useImage(knowlesLeftImg.src);
    const [logoLeftImg] = useImage(configLeft.logo ?? "");

    const [bgRight] = useImage(bgRightImg.src);
    const [baseRight] = useImage(baseRightImg.src);
    const [topRight] = useImage(topRightImg.src);
    const [baseTopRight] = useImage(baseTopRightImg.src);
    const [knowlesRight] = useImage(knowlesRightImg.src);
    const [logoRightImg] = useImage(configRight.logo ?? "");

    const [logoDeviteSilver] = useImage(logoMetal.src);
    const [logoDeviteGold] = useImage(logoGold.src);

    if (
        !bgLeft ||
        !baseLeft ||
        !topLeft ||
        !bgRight ||
        !baseRight ||
        !topRight ||
        !logoDeviteSilver ||
        !logoDeviteGold ||
        !baseTopLeft ||
        !baseTopRight ||
        !knowlesLeft ||
        !knowlesRight
    ) {
        return null;
    }

    const imagesLeft = {
        bg: { img: bgLeft },
        base: { img: baseLeft },
        top: { img: topLeft },
        baseTop: { img: baseTopLeft },
        knowles: { img: knowlesLeft },
    };

    const imagesRight = {
        bg: { img: bgRight },
        base: { img: baseRight },
        top: { img: topRight },
        baseTop: { img: baseTopRight },
        knowles: { img: knowlesRight },
    };

    const logoRight = logoRightImg && {
        img: logoRightImg,
        conf: configRight.logoConfig,
    };

    const logoLeft = logoLeftImg && {
        img: logoLeftImg,
        conf: configLeft.logoConfig,
    };

    const logoDeviteRight = configRight.logoDevite && {
        img: configRight.logoDevite === LogoDeviteColor.Silver ? logoDeviteSilver : logoDeviteGold,
        conf: {
            rotation: -20,
            x: X_CENTER_RIGHT - 50,
            y: Y_CENTER_RIGHT + 50,
        },
    };

    const logoDeviteLeft = configLeft.logoDevite && {
        img: configLeft.logoDevite === LogoDeviteColor.Silver ? logoDeviteSilver : logoDeviteGold,
        conf: {
            rotation: 15,
            x: X_CENTER_LEFT + 70,
            y: Y_CENTER_LEFT - 50,
        },
    };

    const layerScale = getLayerScale(currentSide);
    const layerOffset = getLayerOffset(width, layerScale);

    const textureImgLeft = configLeft.topTexture && (
        <ConfiguratorTexture lr="left" texture={configLeft.topTexture} />
    );
    const textureImgRight = configRight.topTexture && (
        <ConfiguratorTexture lr="right" texture={configRight.topTexture} />
    );

    return (
        <Box ref={wrapperRef} w="100%">
            {widthContainer && (
                <Stage ref={stageRef} width={stageWidth} height={stageHeight} scale={stageScale}>
                    <Layer scale={layerScale.left} offset={layerOffset.left}>
                        <ConfiguratorView
                            images={imagesLeft}
                            config={configRight}
                            width={stageWidth / 2}
                            logo={logoRight}
                            logoDevite={logoDeviteRight}
                            clipTopFunction={clipLeftFunction}
                            topTexture={textureImgRight}
                        />
                    </Layer>

                    <Layer scale={layerScale.right} offset={layerOffset.right} x={LEFT_PHONE_WIDTH}>
                        <ConfiguratorView
                            images={imagesRight}
                            config={configLeft}
                            width={stageWidth / 2}
                            logo={logoLeft}
                            logoDevite={logoDeviteLeft}
                            clipTopFunction={clipRightFunction}
                            topTexture={textureImgLeft}
                        />
                    </Layer>
                </Stage>
            )}
        </Box>
    );
};
