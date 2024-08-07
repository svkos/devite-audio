import { Text } from "@atoms/Text/Text";
import { orderState } from "@store/store";
import { models } from "@templates/Steps/ConfiguratorStep/Customizer/ModelCustomize/constants";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { useRecoilValue } from "recoil";

export const ModelCustomize = () => {
    const model = useRecoilValue(orderState).model;

    return (
        <>
            <Row>{models[model].description}</Row>
            <Row title="Тип драйверов / количество:">{`${models[model].type} сбалансированных арматурных драйвера`}</Row>
            <Row title="Конфигурация драйверов:">{models[model].config}</Row>
            <Row title="Подойдет:">{models[model].whom}</Row>
        </>
    );
};

const Row = ({ title, children }: { title?: string; children: string }) => (
    <>
        {title && (
            <Text
                variant={{ base: "headline18", [MAIN_BREAKPOINT]: "headline24" }}
                color="grey800"
                mb={{ base: 4, [MAIN_BREAKPOINT]: 8 }}
            >
                {title}
            </Text>
        )}

        <Text
            variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
            mb={{ base: 8, [MAIN_BREAKPOINT]: 14 }}
        >
            {children}
        </Text>
    </>
);
