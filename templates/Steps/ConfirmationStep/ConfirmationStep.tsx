import { Text } from "@atoms/Text/Text";
import { Box, Flex, Grid, GridProps, SimpleGrid, Textarea } from "@mantine/core";
import { useOrderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { LR, OrderType, TopType } from "@type/all";
import { ReactNode } from "react";
import { useColors } from "theme/theme";
import { isTextureType } from "utils/helpers";
import { getLogoDevitePrice, getTexturePrice, getCableInfo } from "utils/price";
import { models } from "../ConfiguratorStep/Customizer/ModelCustomize/constants";

export const ConfirmationStep = () => {
    const colors = useColors();
    const [{ state: order }, { setState }] = useOrderState();
    const cable = getCableInfo(order);

    return (
        <Box
            mx="auto"
            my={{ base: 12, [MAIN_BREAKPOINT]: 10 }}
            maw={{ base: "100%", [MAIN_BREAKPOINT]: 970 }}
            w="100%"
        >
            <Text
                variant={{ base: "mobile18", [MAIN_BREAKPOINT]: "title40" }}
                color="grey800"
                mb={{ base: 16, [MAIN_BREAKPOINT]: 50 }}
                ta="center"
            >
                Чек лист
            </Text>

            <Flex justify="space-between" pos="relative">
                <Text
                    bg="white"
                    pr={10}
                    variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                    style={{ zIndex: 1 }}
                >
                    {`Наушники ${order.model}`}
                </Text>
                <Text
                    bg="white"
                    pl={10}
                    variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                    style={{ zIndex: 1 }}
                >
                    {`${models[order.model].price}₽`}
                </Text>

                <Box
                    style={{ borderBottom: `1px dotted ${colors.grey800}` }}
                    w="100%"
                    pos="absolute"
                    bottom={8}
                />
            </Flex>

            <SimpleGrid
                cols={{ base: 1, lg: 2 }}
                mt={16}
                spacing={{ base: 16, [MAIN_BREAKPOINT]: 60 }}
            >
                <Flex direction="column" gap={{ base: 16, [MAIN_BREAKPOINT]: 8 }}>
                    <Row left="Корпус (лев.)" middle={order.left.caseColor.name} right="Включено" />
                    <Row
                        left="Корпус (прав.)"
                        middle={order.right.caseColor.name}
                        right="Включено"
                    />
                    <Row
                        left="Крышка (лев.)"
                        middle={getTopString("left", order)}
                        right={getTexturePriceString("left", order)}
                    />
                    <Row
                        left="Крышка (прав.)"
                        middle={getTopString("right", order)}
                        right={getTexturePriceString("right", order)}
                    />
                </Flex>

                <Flex direction="column" gap={{ base: 16, [MAIN_BREAKPOINT]: 8 }}>
                    <Row
                        left="Изобр. (лев.)"
                        middle={order.left.logoImg ? "Загружено" : "Нет"}
                        right="Включено"
                    />
                    <Row
                        left="Изоб. (прав.)"
                        middle={order.right.logoImg ? "Загружено" : "Нет"}
                        right="Включено"
                    />
                    <Row
                        left="Логотип (лев.)"
                        middle={getLogoDevite("left", order)}
                        right={getLogoDevitePriceString("left", order)}
                    />
                    <Row
                        left="Логотип (прав.)"
                        middle={getLogoDevite("right", order)}
                        right={getLogoDevitePriceString("right", order)}
                    />
                </Flex>
            </SimpleGrid>

            <SimpleGrid
                cols={{ base: 1, lg: 2 }}
                mt={{ base: 16, [MAIN_BREAKPOINT]: 36 }}
                spacing={{ base: 16, [MAIN_BREAKPOINT]: 60 }}
            >
                <Flex
                    direction="column"
                    gap={{ base: 16, [MAIN_BREAKPOINT]: 8 }}
                    style={{ flexBasis: "50%" }}
                >
                    <Text
                        variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                        mb={{ base: 0, [MAIN_BREAKPOINT]: 16 }}
                    >
                        Аксессуары
                    </Text>

                    <Row left="Гравировка" middle={order.boxText || "Нет"} right="Включено" />
                    <Row
                        left="Осн. кабель"
                        middle={cable.hasMainCable ? cable.mainCableColor : "Нет"}
                        right="Включено"
                    />
                    <Row
                        left="Доп. кабель"
                        middle={cable.hasAdditionCable ? cable.additionalCableColor : "Нет"}
                        right={cable.price !== 0 ? `+${cable.price}₽` : "Нет"}
                    />
                </Flex>

                <Flex
                    direction="column"
                    gap={{ base: 16, [MAIN_BREAKPOINT]: 8 }}
                    style={{ flexBasis: "50%" }}
                >
                    <Text
                        variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                        mb={{ base: 0, [MAIN_BREAKPOINT]: 16 }}
                    >
                        Комментарии к заказу
                    </Text>

                    <Textarea
                        h="100%"
                        placeholder="Что-то еще?"
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, comment: e.target.value }));
                        }}
                        styles={{
                            wrapper: { height: "100%" },
                            input: {
                                height: "100%",
                                borderRadius: 8,
                                fontSize: 20,
                                padding: 16,
                                borderColor: colors.grey600,
                            },
                        }}
                    />
                </Flex>
            </SimpleGrid>
        </Box>
    );
};

const getTexturePriceString = (lr: LR, order: OrderType) => {
    const price = getTexturePrice(lr, order);

    return price > 0 ? `+${price}₽` : "Включено";
};

const getLogoDevitePriceString = (lr: LR, order: OrderType) => {
    const price = getLogoDevitePrice(lr, order);

    return price > 0 ? `+${price}₽` : "Включено";
};

export const getTopString = (lr: LR, order: OrderType) => {
    const type = order[lr].topType;
    const label = {
        [TopType.Transparent]: "Проз.",
        [TopType.NotTransparent]: "Непр.",
        [TopType.Pearle]: "Перл.",
        [TopType.Premium]: "Прем.",
    };

    const name = isTextureType(type) ? order[lr].topTexture : order[lr].topColor.name;

    return `${label[type]}/${name}`;
};

export const getLogoDevite = (lr: LR, order: OrderType) => {
    const type = order[lr].logoDevite.type;
    const color = order[lr].logoDevite.color;
    if (type && color) {
        return `${type} ${color}`;
    }
    return "Нет";
};

const Row = ({
    left,
    middle,
    right,
    ...rest
}: { left: ReactNode; middle: ReactNode; right: ReactNode } & GridProps) => {
    const colors = useColors();

    return (
        <Grid grow pos="relative" justify="space-between" {...rest}>
            <Grid.Col span={1}>
                <Text
                    bg="white"
                    pr={10}
                    variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                    color="grey800"
                    style={{ zIndex: 1, whiteSpace: "nowrap" }}
                    w="fit-content"
                    pos="relative"
                >
                    {left}
                </Text>
            </Grid.Col>

            <Grid.Col span="auto">
                <Text
                    bg="white"
                    px={4}
                    variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                    style={{ zIndex: 1, whiteSpace: "nowrap" }}
                    w="fit-content"
                    pos="relative"
                >
                    {middle}
                </Text>
            </Grid.Col>

            <Grid.Col component={Flex} span="auto" style={{ justifyContent: "end" }}>
                <Text
                    bg="white"
                    pl={4}
                    variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                    style={{ zIndex: 1, whiteSpace: "nowrap" }}
                    pos="relative"
                    w="fit-content"
                >
                    {right}
                </Text>
            </Grid.Col>

            <Box
                style={{
                    borderBottom: `1px dotted ${colors.grey800}`,
                    transform: "translate(-50%, 0)",
                }}
                w="90%"
                pos="absolute"
                left="50%"
                bottom={{ base: 2, [MAIN_BREAKPOINT]: 8 }}
            />
        </Grid>
    );
};
