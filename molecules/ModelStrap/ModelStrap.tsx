import Button from "@atoms/Button/Button";
import { Text } from "@atoms/Text/Text";
import { Flex } from "@mantine/core";
import { orderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { useRecoilState } from "recoil";
import { models, ModelsEnum } from "@templates/Steps/ConfiguratorStep/Customizer/ModelCustomize/constants";

export const ModelStrap = () => {
    const [{ model }, setOrder] = useRecoilState(orderState);

    return (
        <Flex>
            {Object.values(ModelsEnum).map((key) => (
                <Button
                    mode="v2"
                    isActive={key === model}
                    key={key}
                    onClick={() => setOrder((prev) => ({ ...prev, model: key }))}
                    fullWidth
                >
                    <Text
                        variant={{ base: "mobile18", [MAIN_BREAKPOINT]: "headline30" }}
                        color={key === model ? "black" : "grey600"}
                    >
                        {models[key].name}
                    </Text>
                </Button>
            ))}
        </Flex>
    );
};
