import { NodeConfig } from "konva/lib/Node";

export type ConfiguratorColor = {
    red: number;
    blue: number;
    green: number;
    opacity?: number;
};

export type ConfiguratorConfig = {
    left: ConfiguratorItemConfig;
    right: ConfiguratorItemConfig;
};

export type ConfiguratorItemConfig = {
    bg: ConfiguratorColor;
    top: ConfiguratorColor;
};

export type ConfiguratorImage = {
    img: HTMLImageElement;
    conf?: NodeConfig;
};

export type ConfiguratorImages = {
    bg: ConfiguratorImage;
    top: ConfiguratorImage;
    base: ConfiguratorImage;
};
