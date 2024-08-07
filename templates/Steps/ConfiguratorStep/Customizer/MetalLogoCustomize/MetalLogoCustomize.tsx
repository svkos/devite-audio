import check from "@assets/check.png";
import goldImg from "@assets/gold.png";
import logoGoldImg from "@assets/logo-gold.png";
import logoMetalImg from "@assets/logo-metal.png";
import metalImg from "@assets/silver.png";
import Button from "@atoms/Button/Button";
import { Info } from "@atoms/Info/Info";
import { Text } from "@atoms/Text/Text";
import { Flex } from "@mantine/core";
import { useConfigState, useOrderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { LogoDeviteType, LogoDeviteColor, LogoDevite } from "@type/all";
import Image from "next/image";
import React from "react";
import { useColors } from "theme/theme";

const logoText = {
    [LogoDeviteType.Devite]: "Devite Audio",
    [LogoDeviteType.Custom]: "Свой логотип",
};

const logoDevite = {
    [LogoDeviteColor.Silver]: logoMetalImg,
    [LogoDeviteColor.Gold]: logoGoldImg,
};

const logoCustom = {
    [LogoDeviteColor.Silver]: metalImg,
    [LogoDeviteColor.Gold]: goldImg,
};

const logoTypeColor = {
    [LogoDeviteType.Devite]: logoDevite,
    [LogoDeviteType.Custom]: logoCustom,
};

export const MetalLogoCustomize = () => {
    const colors = useColors();
    const [
        {
            currentSide: { logoDevite },
        },
        { setLROrder },
    ] = useOrderState();
    const { setDeviteLogo } = useConfigState();

    const onLogoDeviteSet = (logoDevite?: LogoDevite) => {
        setLROrder("logoDevite", logoDevite);
        setDeviteLogo(logoDevite?.type === LogoDeviteType.Custom ? undefined : logoDevite);
    };

    const logos = logoTypeColor[logoDevite.type];

    return (
        <>
            <Flex
                direction={{ base: "column", [MAIN_BREAKPOINT]: "row-reverse" }}
                gap={16}
                align="start"
                my={{ [MAIN_BREAKPOINT]: -40, base: 0 }}
            >
                <Flex
                    direction={{ base: "row", md: "column" }}
                    w={{ base: "100%", [MAIN_BREAKPOINT]: 160 }}
                    style={{ flexShrink: 0 }}
                >
                    {Object.entries(LogoDeviteType).map(([key, value]) => (
                        <Button
                            miw={160}
                            key={key}
                            mode="v2"
                            onClick={() =>
                                onLogoDeviteSet({
                                    type: value,
                                    color: logoDevite?.color,
                                })
                            }
                            isActive={logoDevite?.type === value}
                            fullWidth
                            h={{ base: 32, [MAIN_BREAKPOINT]: 64 }}
                            pb={0}
                            px={0}
                        >
                            <Text
                                variant={{ base: "headline18", [MAIN_BREAKPOINT]: "headline24" }}
                                color={logoDevite?.type === value ? "black" : "grey600"}
                            >
                                {logoText[value]}
                            </Text>
                        </Button>
                    ))}
                </Flex>

                <Flex gap={44} justify="center" w="100%" mt={{ base: 16, [MAIN_BREAKPOINT]: 52 }}>
                    {Object.entries(logos).map(([key, img], i) => {
                        const isActive = key === logoDevite.color;

                        return (
                            <Flex
                                key={i}
                                direction="column"
                                align="center"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    onLogoDeviteSet({
                                        type: logoDevite.type,
                                        color: isActive ? undefined : (key as LogoDeviteColor),
                                    })
                                }
                            >
                                <Flex
                                    bg="black"
                                    style={{
                                        borderRadius: "50%",
                                        ...(isActive && {
                                            outline: `4px solid ${colors.grey800}`,
                                            outlineOffset: "3px",
                                        }),
                                    }}
                                    w={106}
                                    h={106}
                                    align="center"
                                    justify="center"
                                >
                                    {isActive && (
                                        <Flex align="center" justify="center" pos="absolute">
                                            <Image src={check} alt="" />
                                        </Flex>
                                    )}

                                    <Image src={img} alt="" width={96} height={96} />
                                </Flex>

                                <Text variant="headline20" mt={8}>
                                    {key}
                                </Text>
                            </Flex>
                        );
                    })}
                </Flex>
            </Flex>

            {logoDevite?.type === LogoDeviteType.Custom && (
                <Info mt={{ base: 26, [MAIN_BREAKPOINT]: 90 }}>
                    Логотип можно отправить после оформления заказа. Его размер и расположение
                    согласовываются после обработки слепков.
                </Info>
            )}
        </>
    );
};
