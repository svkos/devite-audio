import { Colors } from "@atoms/ColorPicker/ColorPicker";
import { ModelsEnum } from "@templates/Steps/ConfiguratorStep/Customizer/ModelCustomize/constants";
import { LogoDeviteType, OrderType, TopType } from "@type/all";
import {
    X_CENTER_LEFT,
    X_CENTER_RIGHT,
    Y_CENTER_LEFT,
    Y_CENTER_RIGHT,
} from "organisms/Configurator/helper";
import { ConfiguratorConfig, PhonesSidesEnum } from "organisms/Configurator/types";
import { hexToConfiguratorColor } from "utils/hexToRgb";

export const defaultPhonesState: ConfiguratorConfig = {
    currentSide: PhonesSidesEnum.LR,
    left: {
        bg: {
            ...hexToConfiguratorColor(Colors.Transparent),
            opacity: 1,
        },
        top: {
            ...hexToConfiguratorColor(Colors.Transparent),
            opacity: 0.5,
        },
        logoConfig: {
            x: X_CENTER_LEFT,
            y: Y_CENTER_LEFT,
        },
    },
    right: {
        bg: {
            ...hexToConfiguratorColor(Colors.Transparent),
            opacity: 1,
        },
        top: {
            ...hexToConfiguratorColor(Colors.Transparent),
            opacity: 0.5,
        },
        logoConfig: {
            x: X_CENTER_RIGHT,
            y: Y_CENTER_RIGHT,
        },
    },
};

const lrDefault = {
    caseColor: {
        name: "Прозрачный",
        color: Colors.Transparent,
    },
    topColor: {
        name: "Прозрачный",
        color: Colors.Transparent,
    },
    topType: TopType.Transparent,
    logoDevite: {
        type: LogoDeviteType.Devite,
    },
};

export const defaultOrderState: OrderType = {
    model: ModelsEnum.D2,
    left: lrDefault,
    right: lrDefault,
    boxText: "",
    cable: { black: 1, white: 0 },
    comment: "",
};
