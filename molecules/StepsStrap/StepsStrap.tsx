import Button from "@atoms/Button/Button";
import { Text } from "@atoms/Text/Text";
import { Flex } from "@mantine/core";
import { stepState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { Steps } from "@type/all";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const titles = {
    [Steps.Model]: "Модель",
    [Steps.Case]: "Корпус",
    [Steps.Top]: "Крышки",
    [Steps.Logo]: "Изображ.",
    [Steps.MetalLogo]: "Логотип",
    [Steps.Cable]: "Аксессуары",
};

export const StepsStrap = () => {
    const [currentStep, setStep] = useRecoilState(stepState);

    useEffect(() => {
        const section = document.querySelector(`#step-${currentStep}`);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [currentStep]);

    return (
        <Flex direction="row" w="100%" h={34} style={{ flexShrink: 0, overflowX: "scroll" }}>
            {Object.entries(titles).map(([key, value]) => {
                const step = Number(key);

                return (
                    <Button
                        id={`step-${step}`}
                        mode="v2"
                        isActive={step === currentStep}
                        miw={96}
                        key={step}
                        onClick={() => setStep(step)}
                        fullWidth
                    >
                        <Text
                            variant={{ base: "mobile18", [MAIN_BREAKPOINT]: "headline30" }}
                            color={step === currentStep ? "black" : "grey600"}
                        >
                            {value}
                        </Text>
                    </Button>
                );
            })}
        </Flex>
    );
};
