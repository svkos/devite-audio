import { Text } from "@atoms/Text/Text";
import { Box, Flex } from "@mantine/core";
import { MAIN_BREAKPOINT } from "@templates/constants";

export const SuccessStep = () => (
    <Flex direction="column" align="center" justify="center" h="100%" style={{ flexGrow: 1 }}>
        <Box ta="center">
            <Text variant={{ base: "mobile18", [MAIN_BREAKPOINT]: "headline30" }}>
                Ваш заказ принят!
            </Text>

            <Text
                variant={{ base: "mobile18", [MAIN_BREAKPOINT]: "headline30" }}
                mt={{ base: 12, [MAIN_BREAKPOINT]: 24 }}
            >
                Скоро мы свяжемся с вами!
            </Text>

            <a href="https://deviteaudio.ru/" style={{ textDecoration: "none" }}>
                <Text
                    variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                    mt={{ base: 12, [MAIN_BREAKPOINT]: 24 }}
                >
                    На главную страницу
                </Text>
            </a>
        </Box>
    </Flex>
);
