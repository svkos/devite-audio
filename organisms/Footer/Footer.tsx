import chevronLeft from "@assets/chevron-left.svg";
import chevronRight from "@assets/chevron-right.svg";
import Button from "@atoms/Button/Button";
import { Text } from "@atoms/Text/Text";
import { Box, Flex } from "@mantine/core";
import { Progress } from "@organisms/Progress/Progress";
import { orderState, requestOrderStatusState, stepState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { Steps } from "@type/all";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { useColors } from "theme/theme";
import { getTotalPrice } from "utils/price";

export const Footer = () => {
    const colors = useColors();
    const order = useRecoilValue(orderState);
    const [step, setStep] = useRecoilState(stepState);
    const [status] = useRecoilState(requestOrderStatusState);

    const next: Steps = Steps.after(step);
    const previuos: Steps = Steps.previous(step);

    return (
        <Box style={{ borderTop: `1px solid ${colors.grey600}` }}>
            <Progress visibleFrom={MAIN_BREAKPOINT} />

            <Flex py={12} justify="space-between" align="center">
                {step !== Steps.Model ? (
                    <Button
                        mode="v1"
                        disabled={status === "loading"}
                        onClick={() => setStep(previuos)}
                        leftSection={
                            <Button.Round>
                                <Image src={chevronLeft} alt="" />
                            </Button.Round>
                        }
                    >
                        <Text variant={{ base: "headline18", [MAIN_BREAKPOINT]: "headline24" }}>
                            Назад
                        </Text>
                    </Button>
                ) : (
                    <Box w={{ base: 91, [MAIN_BREAKPOINT]: 150 }} />
                )}

                <Box>
                    <Text variant={{ base: "headline18", [MAIN_BREAKPOINT]: "title40" }}>
                        {getTotalPrice(order)}
                    </Text>
                </Box>

                {step === Steps.Form ? (
                    <div>
                        <Button
                            mode="v1"
                            loading={status === "loading"}
                            type="submit"
                            form="orderForm"
                            rightSection={
                                <Button.Round>
                                    <Image src={chevronRight} alt="" />
                                </Button.Round>
                            }
                        >
                            <Text variant={{ base: "headline18", [MAIN_BREAKPOINT]: "headline24" }}>
                                Отправить
                            </Text>
                        </Button>

                        {status === "failed" && (
                            <Text variant="mobile16" c="red">
                                Что-то пошло не так...
                            </Text>
                        )}
                    </div>
                ) : (
                    <Button
                        mode="v1"
                        onClick={(e) => {
                            e.preventDefault();
                            setStep(next);
                        }}
                        rightSection={
                            <Button.Round>
                                <Image src={chevronRight} alt="" />
                            </Button.Round>
                        }
                    >
                        <Text variant={{ base: "headline18", [MAIN_BREAKPOINT]: "headline24" }}>
                            Далее
                        </Text>
                    </Button>
                )}
            </Flex>
        </Box>
    );
};
