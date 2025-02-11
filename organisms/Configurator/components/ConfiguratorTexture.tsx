"use client";

import { Texture } from "@atoms/TexturePicker/constant";
import { LR } from "@type/all";
import { Image } from "react-konva";
import useImage from "use-image";
import blackLeft from "../assets/perl/base-top-left-black.png";
import blueLeft from "../assets/perl/base-top-left-blue.png";
import orangeLeft from "../assets/perl/base-top-left-orange.png";
import pinkLeft from "../assets/perl/base-top-left-pink.png";
import purpleLeft from "../assets/perl/base-top-left-purple.png";
import redLeft from "../assets/perl/base-top-left-red.png";
import turquoiseLeft from "../assets/perl/base-top-left-turquoise.png";
import yellowLeft from "../assets/perl/base-top-left-yellow.png";
import blackRight from "../assets/perl/base-top-right-black.png";
import blueRight from "../assets/perl/base-top-right-blue.png";
import orangeRight from "../assets/perl/base-top-right-orange.png";
import pinkRight from "../assets/perl/base-top-right-pink.png";
import purpleRight from "../assets/perl/base-top-right-purple.png";
import redRight from "../assets/perl/base-top-right-red.png";
import turquoiseRight from "../assets/perl/base-top-right-turquoise.png";
import yellowRight from "../assets/perl/base-top-right-yellow.png";
import carbonLeft from "../assets/texture/base-top-left-carbon.png";
import mammothLeft from "../assets/texture/base-top-left-mammoth.png";
import pearl1Left from "../assets/texture/base-top-left-pearl1.png";
import pearl2Left from "../assets/texture/base-top-left-pearl2.png";
import wood1Left from "../assets/texture/base-top-left-wood1.png";
import wood2Left from "../assets/texture/base-top-left-wood2.png";
import wood3Left from "../assets/texture/base-top-left-wood3.png";
import wood4Left from "../assets/texture/base-top-left-wood4.png";
import wood5Left from "../assets/texture/base-top-left-wood5.png";
import wood6Left from "../assets/texture/base-top-left-wood6.png";
import woodGB1Left from "../assets/texture/base-top-left-woodgb1.png";
import woodGB2Left from "../assets/texture/base-top-left-woodgb2.png";
import carbonRight from "../assets/texture/base-top-right-carbon.png";
import mammothRight from "../assets/texture/base-top-right-mammoth.png";
import pearl1Right from "../assets/texture/base-top-right-pearl1.png";
import pearl2Right from "../assets/texture/base-top-right-pearl2.png";
import wood1Right from "../assets/texture/base-top-right-wood1.png";
import wood2Right from "../assets/texture/base-top-right-wood2.png";
import wood3Right from "../assets/texture/base-top-right-wood3.png";
import wood4Right from "../assets/texture/base-top-right-wood4.png";
import wood5Right from "../assets/texture/base-top-right-wood5.png";
import wood6Right from "../assets/texture/base-top-right-wood6.png";
import woodGB1Right from "../assets/texture/base-top-right-woodgb1.png";
import woodGB2Right from "../assets/texture/base-top-right-woodgb2.png";

type ConfiguratorLogoProps = {
    texture: Texture;
    lr: LR;
};

export const textureConfiguratorImageLeft = {
    [Texture.Carbon]: carbonLeft.src,
    [Texture.Mammoth]: mammothLeft.src,
    [Texture.Pearl1]: pearl1Left.src,
    [Texture.Pearl2]: pearl2Left.src,
    [Texture.Wood1]: wood1Left.src,
    [Texture.Wood2]: wood2Left.src,
    [Texture.Wood3]: wood3Left.src,
    [Texture.Wood4]: wood4Left.src,
    [Texture.Wood5]: wood5Left.src,
    [Texture.Wood6]: wood6Left.src,
    [Texture.WoodGB1]: woodGB1Left.src,
    [Texture.WoodGB2]: woodGB2Left.src,

    [Texture.Black]: blackLeft.src,
    [Texture.Blue]: blueLeft.src,
    [Texture.Orange]: orangeLeft.src,
    [Texture.Pink]: pinkLeft.src,
    [Texture.Purple]: purpleLeft.src,
    [Texture.Red]: redLeft.src,
    [Texture.Turquoise]: turquoiseLeft.src,
    [Texture.Yellow]: yellowLeft.src,
};

export const textureConfiguratorImageRight = {
    [Texture.Carbon]: carbonRight.src,
    [Texture.Mammoth]: mammothRight.src,
    [Texture.Pearl1]: pearl1Right.src,
    [Texture.Pearl2]: pearl2Right.src,
    [Texture.Wood1]: wood1Right.src,
    [Texture.Wood2]: wood2Right.src,
    [Texture.Wood3]: wood3Right.src,
    [Texture.Wood4]: wood4Right.src,
    [Texture.Wood5]: wood5Right.src,
    [Texture.Wood6]: wood6Right.src,
    [Texture.WoodGB1]: woodGB1Right.src,
    [Texture.WoodGB2]: woodGB2Right.src,

    [Texture.Black]: blackRight.src,
    [Texture.Blue]: blueRight.src,
    [Texture.Orange]: orangeRight.src,
    [Texture.Pink]: pinkRight.src,
    [Texture.Purple]: purpleRight.src,
    [Texture.Red]: redRight.src,
    [Texture.Turquoise]: turquoiseRight.src,
    [Texture.Yellow]: yellowRight.src,
};

export const ConfiguratorTexture = ({ texture, lr }: ConfiguratorLogoProps) => {
    const [image] = useImage(
        lr === "right"
            ? textureConfiguratorImageLeft[texture]
            : textureConfiguratorImageRight[texture],
        "anonymous",
    );

    return <Image image={image} alt="" />;
};
