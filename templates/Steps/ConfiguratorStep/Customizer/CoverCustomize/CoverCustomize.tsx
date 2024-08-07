import Button from "@atoms/Button/Button";
import ColorPicker, { Colors, colorTitles } from "@atoms/ColorPicker/ColorPicker";
import { Text } from "@atoms/Text/Text";
import TexturePicker from "@atoms/TexturePicker/TexturePicker";
import { Texture } from "@atoms/TexturePicker/constant";
import { Flex } from "@mantine/core";
import { useConfigState, useOrderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { TopType } from "@type/all";
import { useCallback } from "react";
import { isTextureType } from "utils/helpers";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";
import { topColorsType, topTextureType } from "./constants";

export const CoverCustomize = () => {
    const isMobile = useIsMobile();
    const [{ currentSide }, { setLROrder }] = useOrderState();
    const { setTopColor, setTopTexture } = useConfigState();

    const onColorClick = useCallback(
        (color: Colors, type: TopType) => {
            setLROrder("topColor", { name: colorTitles[color], color });
            setTopColor(color, type);

            setLROrder("topTexture", undefined);
            setTopTexture(undefined);
        },
        [setLROrder, setTopColor, setTopTexture],
    );

    const onTextureClick = useCallback(
        (texture: Texture) => {
            setLROrder("topTexture", texture);
            setTopTexture(texture);
        },
        [setTopTexture, setLROrder],
    );

    const onTypeClick = (type: TopType) => {
        setLROrder("topType", type);

        if (isTextureType(type)) {
            onTextureClick(type === TopType.Pearle ? Texture.Black : Texture.Pearl2);
        } else {
            onColorClick(Colors.Black, type);
        }
    };

    return (
        <Flex
            direction={{ base: "column", [MAIN_BREAKPOINT]: "row-reverse" }}
            gap={16}
            align="start"
            my={{ [MAIN_BREAKPOINT]: -40, base: 0 }}
        >
            <Flex
                direction={{ base: "row", md: "column" }}
                w={{ base: "100%", [MAIN_BREAKPOINT]: 160 }}
                h={isMobile ? 34 : undefined}
                style={{ flexShrink: 0, overflowX: isMobile ? "scroll" : "hidden" }}
            >
                {Object.entries(TopType).map(([key, value]) => (
                    <Button
                        miw={{ base: 130, [MAIN_BREAKPOINT]: 160 }}
                        key={key}
                        mode="v2"
                        onClick={() => onTypeClick(value)}
                        isActive={currentSide.topType === value}
                        fullWidth
                        h={{ base: 32, [MAIN_BREAKPOINT]: 64 }}
                        pb={0}
                        px={0}
                    >
                        <Text
                            variant={{ base: "headline18", [MAIN_BREAKPOINT]: "headline24" }}
                            color={currentSide.topType === value ? "black" : "grey600"}
                        >
                            {value}
                        </Text>
                    </Button>
                ))}
            </Flex>

            <Flex
                align="center"
                wrap="wrap"
                gap={{ base: 6, [MAIN_BREAKPOINT]: 12 }}
                mt={{ base: 0, [MAIN_BREAKPOINT]: 40 }}
            >
                {TopType.NotTransparent === currentSide.topType ||
                TopType.Transparent == currentSide.topType
                    ? topColorsType[currentSide.topType].map((color) => (
                          <ColorPicker
                              key={`color-${color}`}
                              color={color}
                              isActive={currentSide.topColor.color === color}
                              onClick={(color) => onColorClick(color, currentSide.topType)}
                          />
                      ))
                    : topTextureType[currentSide.topType].map((texture) => (
                          <TexturePicker
                              key={`texture-${texture}`}
                              texture={texture}
                              isActive={currentSide.topTexture === texture}
                              onClick={onTextureClick}
                          />
                      ))}
            </Flex>
        </Flex>
    );
};
