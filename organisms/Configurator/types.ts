import { Texture } from "@atoms/TexturePicker/constant";
import { LogoDeviteColor } from "@type/all";
import { NodeConfig } from "konva/lib/Node";

export type ConfiguratorColor = {
    red: number;
    blue: number;
    green: number;
    opacity?: number;
};

export enum PhonesSidesEnum {
    L = "L",
    LR = "LR",
    R = "R",
}

export type ConfiguratorConfig = {
    currentSide: PhonesSidesEnum;
    left: ConfiguratorItemConfig;
    right: ConfiguratorItemConfig;
};

export type ConfiguratorItemConfig = {
    bg: ConfiguratorColor;
    top: ConfiguratorColor;
    topTexture?: Texture;
    logo?: string;
    logoConfig?: NodeConfig;
    logoDevite?: LogoDeviteColor;
};

export type ConfiguratorImage = {
    img: HTMLImageElement;
    conf?: NodeConfig;
};

export type ConfiguratorImages = {
    bg: ConfiguratorImage;
    top: ConfiguratorImage;
    base: ConfiguratorImage;
    baseTop: ConfiguratorImage;
    knowles: ConfiguratorImage;
};
