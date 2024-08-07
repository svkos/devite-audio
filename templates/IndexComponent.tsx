"use client";

import { Box, Flex } from "@mantine/core";
import { Footer } from "@organisms/Footer/Footer";
import { Header } from "@organisms/Header/Header";
import { stepState, visitedStepsState } from "@store/store";
import { BoxStep } from "@templates/Steps/BoxStep/BoxStep";
import { ConfiguratorStep } from "@templates/Steps/ConfiguratorStep/ConfiguratorStep";
import { ConfirmationStep } from "@templates/Steps/ConfirmationStep/ConfirmationStep";
import { FormStep } from "@templates/Steps/FormStep/FormStep";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Steps } from "../type/all";
import { SuccessStep } from "./Steps/SuccessStep/SuccessStep";
import { MAIN_BREAKPOINT } from "./constants";

export const IndexComponent = () => {
    const step = useRecoilValue(stepState);
    const [, setVisitedSteps] = useRecoilState(visitedStepsState);

    const Component = (() => {
        switch (step) {
            case Steps.Model:
            case Steps.Case:
            case Steps.Top:
            case Steps.Logo:
            case Steps.MetalLogo:
            case Steps.Cable:
                return ConfiguratorStep;

            case Steps.Box:
                return BoxStep;

            case Steps.Confirmation:
                return ConfirmationStep;

            case Steps.Form:
                return FormStep;

            case Steps.Success:
                return SuccessStep;
        }
    })();

    useEffect(() => {
        setVisitedSteps((prev) => Array.from(new Set([...prev, step])));
    }, [setVisitedSteps, step]);

    return (
        <Flex direction="column" mih="100vh">
            <Header />

            <Flex
                direction="column"
                justify="space-between"
                h="100%"
                w="100%"
                maw={1400}
                py={{ [MAIN_BREAKPOINT]: 40, base: 12 }}
                px={{ [MAIN_BREAKPOINT]: 0, base: 16 }}
                mx="auto"
                style={{ flexGrow: 1 }}
            >
                <Component />
            </Flex>

            {step !== Steps.Success && (
                <Box pos="sticky" bottom={0} bg="white" w="100%" style={{ zIndex: 1 }}>
                    <Box maw={1432} mx="auto" px={{ [MAIN_BREAKPOINT]: 16, base: 16 }}>
                        <Footer />
                    </Box>
                </Box>
            )}
        </Flex>
    );
};
