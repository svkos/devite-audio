import { Box } from "@mantine/core";
import { Image, Layer, Stage, TextPath } from "react-konva";
import useImage from "use-image";
import useDimensions from "utils/hooks/useDimentions/useDimentions";
import boxImg from "./assets/box.png";

const SCENE_WIDTH = 491;

export const BoxConfigurator = ({ text }: { text: string }) => {
    const [ref, { width: widthContainer }] = useDimensions({});
    const width = widthContainer ?? SCENE_WIDTH;
    const scale = width / SCENE_WIDTH;
    const stageWidth = SCENE_WIDTH * scale;
    const stageScale = { x: scale, y: scale };

    const [box] = useImage(boxImg.src);

    return (
        <Box ref={ref} w="100%">
            {widthContainer && (
                <Stage width={stageWidth} height={stageWidth} scale={stageScale}>
                    <Layer>
                        <Image image={box} alt="" />

                        <TextPath
                            fill="white"
                            fontFamily="'Akrobat ExtraBold', sans-serif"
                            fontSize={33}
                            letterSpacing={3}
                            text={text}
                            data={"M 80 350 Q 248 550 420 350"}
                            align="center"
                            x={8}
                            y={-35}
                        />
                    </Layer>
                </Stage>
            )}
        </Box>
    );
};
