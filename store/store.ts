import { Colors } from "@atoms/ColorPicker/ColorPicker";
import { Texture } from "@atoms/TexturePicker/constant";
import { NodeConfig } from "konva/lib/Node";
import { atom, SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import { ConfiguratorConfig, PhonesSidesEnum } from "../organisms/Configurator/types";
import { LogoDevite, OrderColor, OrderLRType, OrderType, Steps, TopType } from "../type/all";
import { defaultOrderState, defaultPhonesState } from "./default";
import { getColorValue, setConfigValue } from "./helper";

export const phonesConfigState = atom<ConfiguratorConfig>({
    key: "PhonesConfig",
    default: defaultPhonesState,
});

export const stepState = atom<Steps>({
    key: "Steps",
    default: Steps.Model,
});

export const visitedStepsState = atom<Steps[]>({
    key: "visitedStepsState",
    default: [],
});

export const orderState = atom<OrderType>({
    key: "Order",
    default: defaultOrderState,
});

export const requestOrderStatusState = atom<"init" | "loading" | "success" | "failed">({
    key: "requestOrderStatus",
    default: "init",
});

export const selectedDragLogoState = atom<boolean>({
    key: "SelectedDragLogoState",
    default: true,
});

export const useConfigState = () => {
    const [state, setState] = useRecoilState(phonesConfigState);

    const setBackground = (color: Colors) =>
        setState((prev) => setConfigValue(prev, "bg", getColorValue(color, TopType.NotTransparent)));

    const setTopColor = (color: Colors, type: TopType) =>
        setState((prev) => setConfigValue(prev, "top", getColorValue(color, type)));

    const setTopTexture = (texture?: Texture) =>
        setState((prev) => setConfigValue(prev, "topTexture", texture));

    const setLogo = (logo: string | undefined) =>
        setState((prev) => setConfigValue(prev, "logo", logo));

    const setLogoConfig = (conf: NodeConfig) =>
        setState((prev) => setConfigValue(prev, "logoConfig", conf));

    const initLogoConfig = () =>
        setState((prev) => {
            if (prev.currentSide === PhonesSidesEnum.LR) {
                return {
                    ...prev,
                    left: {
                        ...prev.left,
                        logoConfig: defaultPhonesState.left.logoConfig,
                    },
                    right: {
                        ...prev.right,
                        logoConfig: defaultPhonesState.right.logoConfig,
                    },
                };
            }

            const side = prev.currentSide === PhonesSidesEnum.L ? "left" : "right";

            return {
                ...prev,
                [side]: {
                    ...prev[side],
                    logoConfig: defaultPhonesState[side].logoConfig,
                },
            };
        });

    const setDeviteLogo = (logoDevite: LogoDevite | undefined) =>
        setState((prev) => setConfigValue(prev, "logoDevite", logoDevite?.color));

    return {
        state,
        setBackground,
        setTopColor,
        setLogo,
        setLogoConfig,
        initLogoConfig,
        setDeviteLogo,
        setTopTexture,
    };
};

export const useOrderState: () => [
    { state: OrderType; currentSide: OrderLRType },
    {
        setState: SetterOrUpdater<OrderType>;
        setLROrder: <T = OrderColor>(key: keyof OrderLRType, value: T) => void;
    },
] = () => {
    const config = useRecoilValue(phonesConfigState);
    const [order, setOrder] = useRecoilState(orderState);

    const side = config.currentSide === PhonesSidesEnum.L ? "left" : "right";

    const setLROrder = <T = OrderColor>(key: keyof OrderLRType, value: T) => {
        setOrder((prev) => {
            if (config.currentSide === PhonesSidesEnum.LR) {
                return {
                    ...prev,
                    left: { ...prev.left, [key]: value },
                    right: { ...prev.right, [key]: value },
                };
            }

            return { ...prev, [side]: { ...prev[side], [key]: value } };
        });
    };

    return [
        { state: order, currentSide: order[side] },
        { setState: setOrder, setLROrder },
    ];
};
