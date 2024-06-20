"use client";
import { Image, Layer, Stage } from "react-konva";
import Konva from "konva";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { ConfiguratorColor, ConfiguratorItemConfig, ConfiguratorImages } from "./types";

type ConfiguratorProps = {
    config: ConfiguratorItemConfig;
    images: ConfiguratorImages;
    width: number;
    height: number;
};

export const ConfiguratorView = ({ images, config, width, height }: ConfiguratorProps) => {
    const { bg: bgImg, base: baseImg, top: topImg } = images;

    const imgWidth = width;
    const imgHeight = (width * bgImg.img.naturalHeight) / bgImg.img.naturalWidth;

    const bgLeftRef = useRef<Konva.Image>(null);
    const baseLeftRef = useRef<Konva.Image>(null);
    const topLeftRef = useRef<Konva.Image>(null);

    const changeColor = (ref: RefObject<Konva.Image>, conf: ConfiguratorColor) => {
        ref.current?.cache();
        conf?.opacity && ref.current?.opacity(conf.opacity);
        ref.current?.red(conf.red);
        ref.current?.blue(conf.blue);
        ref.current?.green(conf.green);
    };

    const changeBgColor = useCallback((conf: ConfiguratorColor) => {
        changeColor(bgLeftRef, conf);
    }, []);

    const changeTopColor = useCallback((conf: ConfiguratorColor) => {
        changeColor(topLeftRef, conf);
    }, []);

    useEffect(() => {
        changeBgColor(config.bg);
    }, [changeBgColor, config.bg]);

    useEffect(() => {
        changeTopColor(config.top);
    }, [changeTopColor, config.top]);

    return (
        <Stage width={width} height={height}>
            <Layer>
                <Image
                    image={bgImg.img}
                    width={imgWidth}
                    height={imgHeight}
                    alt=""
                    filters={[Konva.Filters.RGB]}
                    ref={bgLeftRef}
                    {...bgImg.conf}
                />

                <Image
                    image={baseImg.img}
                    width={imgWidth}
                    height={imgHeight}
                    alt=""
                    ref={baseLeftRef}
                    {...baseImg.conf}
                />

                <Image
                    image={topImg.img}
                    width={imgWidth}
                    height={imgHeight}
                    alt=""
                    filters={[Konva.Filters.RGB]}
                    ref={topLeftRef}
                    {...topImg.conf}
                />
            </Layer>
        </Stage>
    );
};
