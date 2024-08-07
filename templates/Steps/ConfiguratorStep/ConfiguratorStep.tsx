"use client";

import { Text } from "@atoms/Text/Text";
import { Box, Flex } from "@mantine/core";
import { StepsStrap } from "@molecules/StepsStrap/StepsStrap";
import { stepState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { ConfiguratorStepType, Steps } from "@type/all";
import { LeftRightStrap } from "molecules/LeftRightStrap/LeftRightStrap";
import { ModelStrap } from "molecules/ModelStrap/ModelStrap";
import dynamic from "next/dynamic";
import React from "react";
import { useRecoilValue } from "recoil";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";
import { CableCustomize } from "./Customizer/CableCustomize/CableCustomize";
import { CaseCustomize } from "./Customizer/CaseCustomize/CaseCustomize";
import { CoverCustomize } from "./Customizer/CoverCustomize/CoverCustomize";
import { LogoCustomize } from "./Customizer/LogoCustomize/LogoCustomize";
import { MetalLogoCustomize } from "./Customizer/MetalLogoCustomize/MetalLogoCustomize";
import { ModelCustomize } from "./Customizer/ModelCustomize/ModelCustomize";

const Configurator = dynamic(
    () =>
        import("organisms/Configurator/Configurator").then((module) => ({
            default: module.Configurator,
        })),
    {
        ssr: false,
    },
);

const titles = {
    [Steps.Model]: "Выберите модель наушников",
    [Steps.Case]: "Выберите цвет корпусов",
    [Steps.Top]: "Выберите цвет крышек",
    [Steps.Logo]: "Выберите изображение",
    [Steps.MetalLogo]: "Выберите металлический логотип",
    [Steps.Cable]: "Выберите кабель",
};

export const ConfiguratorStep = () => {
    const isMobile = useIsMobile();
    const step = useRecoilValue(stepState) as ConfiguratorStepType;

    const Customizer = (() => {
        switch (step) {
            case Steps.Model:
                return ModelCustomize;
            case Steps.Case:
                return CaseCustomize;
            case Steps.Top:
                return CoverCustomize;
            case Steps.Logo:
                return LogoCustomize;
            case Steps.MetalLogo:
                return MetalLogoCustomize;
            case Steps.Cable:
                return CableCustomize;
        }
    })();

    return (
        <Flex
            direction={{ base: "column", [MAIN_BREAKPOINT]: "row" }}
            justify="space-between"
            gap={12}
        >
            <Box mt={{ base: 16, [MAIN_BREAKPOINT]: 146 }} w="100%" style={{ flexShrink: 1 }}>
                <Configurator />
            </Box>

            <Box style={{ flexShrink: 0 }} w={{ base: "100%", [MAIN_BREAKPOINT]: 690 }}>
                <Text variant="title40" color="grey800" mb={32} visibleFrom={MAIN_BREAKPOINT}>
                    {titles[step]}
                </Text>

                <Box hiddenFrom={MAIN_BREAKPOINT} mb={16}>
                    <StepsStrap />
                </Box>

                <Box hidden={!isMobile && step === Steps.Cable}>
                    <Box hidden={isMobile && step !== Steps.Model}>
                        <ModelStrap />
                    </Box>

                    <Box
                        mt={{ base: 16, [MAIN_BREAKPOINT]: 8 }}
                        hidden={
                            (isMobile && [Steps.Model, Steps.Cable].includes(step)) ||
                            (!isMobile && step === Steps.Model)
                        }
                    >
                        <LeftRightStrap />
                    </Box>
                </Box>

                <Box py={{ [MAIN_BREAKPOINT]: 40, base: 16 }}>
                    <Customizer />
                </Box>
            </Box>
        </Flex>
    );
};
