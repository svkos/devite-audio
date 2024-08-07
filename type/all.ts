import { Colors } from "@atoms/ColorPicker/ColorPicker";
import { Texture } from "@atoms/TexturePicker/constant";
import { ModelsEnum } from "../templates/Steps/ConfiguratorStep/Customizer/ModelCustomize/constants";

export enum Steps {
    Model,
    Case,
    Top,
    Logo,
    MetalLogo,
    Cable,
    Box,
    Confirmation,
    Form,
    Success,
}

export namespace Steps {
    export function after(value: Steps): Steps {
        return value + 1;
    }

    export function previous(value: Steps): Steps {
        return value - 1;
    }
}

export type ConfiguratorStepType =
    | Steps.Model
    | Steps.Case
    | Steps.Top
    | Steps.Logo
    | Steps.MetalLogo
    | Steps.Cable;

export enum TopType {
    Transparent = "Прозрачный",
    NotTransparent = "Непрозрачный",
    Pearle = "Перламутр",
    Premium = "Премиум",
}

export enum LogoDeviteColor {
    Silver = "Серебро",
    Gold = "Золото",
}

export enum LogoDeviteType {
    Devite = "Devite",
    Custom = "Свой",
}

export type LogoDevite = {
    type: LogoDeviteType;
    color?: LogoDeviteColor;
};

export type OrderColor = {
    name: string;
    color: Colors;
};

export type OrderLRType = {
    caseColor: OrderColor;
    topColor: OrderColor;
    topType: TopType;
    topTexture?: Texture;
    logoImg?: string;
    logoDevite: LogoDevite;
};

export type OrderType = {
    model: ModelsEnum;
    left: OrderLRType;
    right: OrderLRType;
    boxText: string;
    cable: {
        black?: number;
        white?: number;
    };
    comment: string;
};

export type Form = {
    name: string;
    phone: string;
    email: string;
    city: string;
    pvz: string;
    personal: boolean;
    warranty: boolean;
};

export type LR = "left" | "right";
