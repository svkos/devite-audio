import { Text } from "@atoms/Text/Text";
import { Box, BoxProps, SimpleGrid } from "@mantine/core";
import { Progress as MantineProgress } from "@mantine/core";
import { stepState, useOrderState, visitedStepsState } from "@store/store";
import { models } from "@templates/Steps/ConfiguratorStep/Customizer/ModelCustomize/constants";
import { LR, OrderType, Steps, TopType } from "@type/all";
import { useRecoilValue } from "recoil";
import { useColors } from "theme/theme";
import { isTextureType } from "utils/helpers";

export const Progress = (props: BoxProps) => {
    const colors = useColors();
    const [{ state: order }] = useOrderState();
    const step = useRecoilValue(stepState);
    const visitedSteps = useRecoilValue(visitedStepsState);

    const progress = (100 * step) / 7;

    return (
        <Box {...props}>
            <SimpleGrid cols={6}>
                <Item
                    title="Модель:"
                    isEmpty={false}
                    left={order.model}
                    right={`${models[order.model].type}-драйверные`}
                />
                <Item
                    title="Корпус:"
                    isEmpty={!visitedSteps.includes(Steps.Case)}
                    left={getCaseString("left", order)}
                    right={getCaseString("right", order)}
                />
                <Item
                    title="Крышки:"
                    isEmpty={!visitedSteps.includes(Steps.Top)}
                    left={getTopString("left", order)}
                    right={getTopString("right", order)}
                />
                <Item
                    title="Логотип:"
                    isEmpty={!visitedSteps.includes(Steps.MetalLogo)}
                    left={getLogoString("left", order)}
                    right={getLogoString("right", order)}
                />
                <Item
                    title="Кабель:"
                    isEmpty={!visitedSteps.includes(Steps.Cable)}
                    left={getCableString("white", order)}
                    right={getCableString("black", order)}
                />
                <Item
                    title="На кейсе:"
                    isEmpty={!visitedSteps.includes(Steps.Box)}
                    left={order.boxText}
                />
            </SimpleGrid>

            <MantineProgress
                value={progress}
                color={colors.aqua}
                radius="xs"
                mt={4}
                bg="white"
                style={{ borderBottom: `1px solid ${colors.grey600}` }}
            />
        </Box>
    );
};

const Item = ({
    title,
    left,
    right,
    isEmpty,
}: {
    title: string;
    left: string;
    right?: string;
    isEmpty: boolean;
}) => (
    <Box>
        <Text variant="headline20" color="grey800" mb={2}>
            {title}
        </Text>
        <Text variant="headline20">{!isEmpty ? left : "---"}</Text>
        {right && <Text variant="headline20">{!isEmpty ? right : "---"}</Text>}
    </Box>
);

const lrLabel = {
    left: "Л",
    right: "П",
};
const cableLabel = {
    white: "Белый",
    black: "Черный",
};

const getCaseString = (lr: LR, order: OrderType) => {
    const color = order[lr].caseColor.name;

    return `${lrLabel[lr]} - ${color}`;
};

const getTopString = (lr: LR, order: OrderType) => {
    const type = order[lr].topType;
    const label = {
        [TopType.Transparent]: "Проз.",
        [TopType.NotTransparent]: "Непр.",
        [TopType.Pearle]: "Перл.",
        [TopType.Premium]: "Прем.",
    };

    const name = isTextureType(type) ? order[lr].topTexture : order[lr].topColor.name;

    return `${lrLabel[lr]} - ${label[type]} / ${name}`;
};

const getLogoString = (lr: LR, order: OrderType) => {
    const type = order[lr].logoDevite.type;
    const color = order[lr].logoDevite.color;

    if (!color) {
        return "---";
    }
    return `${lrLabel[lr]} - ${type} / ${color}`;
};

const getCableString = (color: keyof OrderType["cable"], order: OrderType) => {
    const cable = order.cable[color];

    return `${cableLabel[color]} - ${cable} шт`;
};
