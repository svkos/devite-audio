"use client";

import { Box } from "@mantine/core";
import { phonesConfigState } from "@store/store";
import Konva from "konva";
import { ForwardedRef } from "react";
import { Layer, Stage } from "react-konva";
import { useRecoilValue } from "recoil";
import useDimensions from "utils/hooks/useDimentions/useDimentions";
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
} from "./helper";
import { useConfiguratorImages } from "./hooks";

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

    const images = useConfiguratorImages();

    if (!images) {
        return null;
    }

    const { imagesLeft, imagesRight, logoRight, logoLeft, logoDeviteRight, logoDeviteLeft } =
        images;

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
