"use client";

import Konva from "konva";
import { SceneContext } from "konva/lib/Context";
import { ReactNode, RefObject, useCallback, useLayoutEffect, useRef } from "react";
import { Image } from "react-konva";
import {
    ConfiguratorColor,
    ConfiguratorItemConfig,
    ConfiguratorImages,
    ConfiguratorImage,
} from "../types";
import { ConfiguratorLogo } from "./ConfiguratorLogo";

type ConfiguratorProps = {
    config: ConfiguratorItemConfig;
    images: ConfiguratorImages;
    width: number;
    logo?: ConfiguratorImage;
    logoDevite?: ConfiguratorImage;
    topTexture?: ReactNode;
    clipTopFunction: (ctx: SceneContext) => void;
};

export const ConfiguratorView = ({
    images,
    config,
    width,
    logo,
    logoDevite,
    topTexture,
    clipTopFunction,
}: ConfiguratorProps) => {
    const {
        bg: bgImg,
        base: baseImg,
        top: topImg,
        baseTop: baseTopImg,
        knowles: knowlesImg,
    } = images;

    const bgRef = useRef<Konva.Image>(null);
    const topRef = useRef<Konva.Image>(null);

    const changeColor = (ref: RefObject<Konva.Image>, conf: ConfiguratorColor) => {
        ref.current?.cache();
        conf?.opacity && ref.current?.opacity(conf.opacity);
        ref.current?.red(conf.red);
        ref.current?.blue(conf.blue);
        ref.current?.green(conf.green);
    };

    const changeBgColor = useCallback((conf: ConfiguratorColor) => {
        changeColor(bgRef, conf);
    }, []);

    const changeTopColor = useCallback((conf: ConfiguratorColor) => {
        changeColor(topRef, conf);
    }, []);

    useLayoutEffect(() => {
        changeBgColor(config.bg);
    }, [changeBgColor, config.bg, width]);

    useLayoutEffect(() => {
        !topTexture && changeTopColor(config.top);
    }, [changeTopColor, config.top, topTexture, width]);

    return (
        <>
            <Image
                image={bgImg.img}
                alt=""
                filters={[Konva.Filters.RGB]}
                ref={bgRef}
                {...bgImg.conf}
            />

            <Image image={knowlesImg.img} alt="" {...knowlesImg.conf} opacity={0.3} />

            <Image image={baseImg.img} alt="" {...baseImg.conf} opacity={0.7} />

            <Image
                image={topImg.img}
                alt=""
                filters={[Konva.Filters.RGB]}
                ref={topRef}
                {...topImg.conf}
            />

            {topTexture}

            <Image image={baseTopImg.img} alt="" {...baseTopImg.conf} />

            {logo && <ConfiguratorLogo logo={logo} clipFunction={clipTopFunction} />}

            {logoDevite && <Image image={logoDevite.img} alt="" {...logoDevite.conf} />}
        </>
    );
};
