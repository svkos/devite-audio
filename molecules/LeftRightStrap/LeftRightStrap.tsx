import Button from "@atoms/Button/Button";
import { Text } from "@atoms/Text/Text";
import { Flex, FlexProps } from "@mantine/core";
import { PhonesSidesEnum } from "@organisms/Configurator/types";
import { phonesConfigState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { useRecoilState } from "recoil";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";

export const LeftRightStrap = (props: FlexProps) => {
    const isMobile = useIsMobile();

    const [config, setConfig] = useRecoilState(phonesConfigState);

    const title = {
        [PhonesSidesEnum.L]: isMobile ? "L" : "Левый",
        [PhonesSidesEnum.LR]: isMobile ? "L/R" : "Левый/правый",
        [PhonesSidesEnum.R]: isMobile ? "R" : "Правый",
    };

    return (
        <Flex {...props}>
            {Object.values(PhonesSidesEnum).map((key) => (
                <Button
                    key={key}
                    mode="v2"
                    isActive={key === config.currentSide}
                    onClick={() => setConfig((prev) => ({ ...prev, currentSide: key }))}
                    fullWidth
                >
                    <Text
                        variant={{ base: "mobile18", [MAIN_BREAKPOINT]: "headline30" }}
                        color={key === config.currentSide ? "black" : "grey600"}
                    >
                        {title[key]}
                    </Text>
                </Button>
            ))}
        </Flex>
    );
};
