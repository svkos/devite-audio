import { Colors } from "@atoms/ColorPicker/ColorPicker";
import {
    ConfiguratorColor,
    ConfiguratorConfig,
    ConfiguratorItemConfig,
    PhonesSidesEnum,
} from "organisms/Configurator/types";
import { TopType } from "@type/all";
import { hexToConfiguratorColor } from "utils/hexToRgb";

export const setConfigLeftRight = <T = ConfiguratorColor>(
    prev: ConfiguratorConfig,
    leftRight: "left" | "right",
    key: keyof ConfiguratorItemConfig,
    value: T,
) => ({
    [leftRight]: {
        ...prev[leftRight],
        [key]: value,
    },
});

export const setConfigValue = <T = ConfiguratorColor>(
    prev: ConfiguratorConfig,
    key: keyof ConfiguratorItemConfig,
    value: T,
) => {
    if (prev.currentSide === PhonesSidesEnum.LR) {
        return {
            ...prev,
            ...setConfigLeftRight(prev, "left", key, value),
            ...setConfigLeftRight(prev, "right", key, value),
        };
    }

    const side = prev.currentSide === PhonesSidesEnum.L ? "left" : "right";

    return {
        ...prev,
        ...setConfigLeftRight(prev, side, key, value),
    };
};

export const getColorValue = (color: Colors, type: TopType) => {
    switch (type) {
        case TopType.Transparent:
            return {
                ...hexToConfiguratorColor(color),
                opacity: 0.7,
            };
        case TopType.NotTransparent:
            return {
                ...hexToConfiguratorColor(color),
                opacity: 1,
            };
    }
};
