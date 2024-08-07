import { Text } from "@atoms/Text/Text";
import { TextInput } from "@atoms/TextInput/TextInput";
import { Box, Flex } from "@mantine/core";
import { orderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";

const MAX_LENGTH = 24;

const BoxConfigurator = dynamic(
    () =>
        import("organisms/BoxConfigurator/BoxConfigurator").then((module) => ({
            default: module.BoxConfigurator,
        })),
    {
        ssr: false,
    },
);

export const BoxStep = () => {
    const [{ boxText }, setOrder] = useRecoilState(orderState);

    return (
        <Flex
            px={{ base: 0, [MAIN_BREAKPOINT]: 70 }}
            justify="space-between"
            direction={{ base: "column", [MAIN_BREAKPOINT]: "row" }}
            gap={12}
        >
            <Text
                variant="headline18"
                color="grey800"
                hiddenFrom={MAIN_BREAKPOINT}
                ta="center"
                mb={24}
                mt={12}
            >
                Введите данные для гравировки кейса
            </Text>

            <Box
                w={{ base: "100%", [MAIN_BREAKPOINT]: 460 }}
                px={{ base: 24, [MAIN_BREAKPOINT]: 0 }}
            >
                <BoxConfigurator text={boxText} />
            </Box>

            <Flex
                mt={{ base: 50, [MAIN_BREAKPOINT]: 0 }}
                direction="column"
                justify="space-between"
            >
                <Text variant="title40" color="grey800" visibleFrom={MAIN_BREAKPOINT}>
                    Введите данные для гравировки кейса
                </Text>

                <TextInput
                    value={boxText}
                    placeholder="Ваши данные"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value.length < MAX_LENGTH) {
                            setOrder((prev) => ({ ...prev, boxText: value }));
                        }
                    }}
                />

                <Box h={40} />
            </Flex>
        </Flex>
    );
};
