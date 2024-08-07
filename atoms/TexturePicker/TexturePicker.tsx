import check from "@assets/check.png";
import { Text } from "@atoms/Text/Text";
import { Box, Flex } from "@mantine/core";
import { MAIN_BREAKPOINT } from "@templates/constants";
import Image from "next/image";
import { useColors } from "theme/theme";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";
import { Texture, textureImage } from "./constant";

type Props = {
    texture: Texture;
    isActive: boolean;
    onClick: (texture: Texture) => void;
};

const TexturePicker = ({ isActive, texture, onClick }: Props) => {
    const isMobile = useIsMobile();
    const colors = useColors();

    return (
        <Flex direction="column" align="center">
            <Flex
                p={12}
                h={{ base: 72, [MAIN_BREAKPOINT]: 100 }}
                w={{ base: 72, [MAIN_BREAKPOINT]: 100 }}
                align="center"
                justify="center"
                direction="column"
            >
                <Flex
                    h={{ base: 64, [MAIN_BREAKPOINT]: 90 }}
                    w={{ base: 64, [MAIN_BREAKPOINT]: 90 }}
                    style={{
                        ...(isActive && {
                            boxShadow: `0 0 0 ${isMobile ? "2px" : "3px"} white, 0 0 0 ${isMobile ? "4px" : "7px"} ${isMobile ? colors.black : colors.grey800}`,
                        }),
                        borderRadius: "8px",
                        cursor: "pointer",
                        flexShrink: 0,
                    }}
                    onClick={() => onClick(texture)}
                    align="center"
                    justify="center"
                >
                    <Image
                        src={textureImage[texture]}
                        alt=""
                        width={0}
                        height={0}
                        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                    />

                    {isActive && (
                        <Box pos="absolute">
                            <Image src={check} alt="" />
                        </Box>
                    )}
                </Flex>
            </Flex>

            <Text variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }} mt={2}>
                {texture}
            </Text>
        </Flex>
    );
};

export default TexturePicker;
