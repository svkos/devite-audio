import logoGold from "@assets/logo-gold.png";
import logoMetal from "@assets/logo-metal.png";
import { phonesConfigState } from "@store/store";
import { LogoDeviteColor } from "@type/all";
import { useRecoilValue } from "recoil";
import useImage from "use-image";
import baseLeftImg from "./assets/base-left.png";
import baseRightImg from "./assets/base-right.png";
import baseTopLeftImg from "./assets/base-top-left.png";
import baseTopRightImg from "./assets/base-top-right.png";
import bgLeftImg from "./assets/bg-left.png";
import bgRightImg from "./assets/bg-right.png";
import knowlesLeftImg from "./assets/knowles-left.png";
import knowlesRightImg from "./assets/knowles-right.png";
import topLeftImg from "./assets/top-left.png";
import topRightImg from "./assets/top-right.png";
import { X_CENTER_LEFT, X_CENTER_RIGHT, Y_CENTER_LEFT, Y_CENTER_RIGHT } from "./helper";

export const useConfiguratorImages = () => {
    const configLeft = useRecoilValue(phonesConfigState).left;
    const configRight = useRecoilValue(phonesConfigState).right;

    const [bgLeft] = useImage(bgLeftImg.src, 'anonymous');
    const [baseLeft] = useImage(baseLeftImg.src, 'anonymous');
    const [topLeft] = useImage(topLeftImg.src, 'anonymous');
    const [baseTopLeft] = useImage(baseTopLeftImg.src, 'anonymous');
    const [knowlesLeft] = useImage(knowlesLeftImg.src, 'anonymous');
    const [logoLeftImg] = useImage(configLeft.logo ?? "", 'anonymous');

    const [bgRight] = useImage(bgRightImg.src, 'anonymous');
    const [baseRight] = useImage(baseRightImg.src, 'anonymous');
    const [topRight] = useImage(topRightImg.src, 'anonymous');
    const [baseTopRight] = useImage(baseTopRightImg.src, 'anonymous');
    const [knowlesRight] = useImage(knowlesRightImg.src, 'anonymous');
    const [logoRightImg] = useImage(configRight.logo ?? "", 'anonymous');

    const [logoDeviteSilver] = useImage(logoMetal.src, 'anonymous');
    const [logoDeviteGold] = useImage(logoGold.src, 'anonymous');

    if (
        !bgLeft ||
        !baseLeft ||
        !topLeft ||
        !bgRight ||
        !baseRight ||
        !topRight ||
        !logoDeviteSilver ||
        !logoDeviteGold ||
        !baseTopLeft ||
        !baseTopRight ||
        !knowlesLeft ||
        !knowlesRight
    ) {
        return false;
    }

    const imagesLeft = {
        bg: { img: bgLeft },
        base: { img: baseLeft },
        top: { img: topLeft },
        baseTop: { img: baseTopLeft },
        knowles: { img: knowlesLeft },
    };

    const imagesRight = {
        bg: { img: bgRight },
        base: { img: baseRight },
        top: { img: topRight },
        baseTop: { img: baseTopRight },
        knowles: { img: knowlesRight },
    };

    const logoRight = logoRightImg && {
        img: logoRightImg,
        conf: configRight.logoConfig,
    };

    const logoLeft = logoLeftImg && {
        img: logoLeftImg,
        conf: configLeft.logoConfig,
    };

    const logoDeviteRight = configRight.logoDevite && {
        img: configRight.logoDevite === LogoDeviteColor.Silver ? logoDeviteSilver : logoDeviteGold,
        conf: {
            rotation: -20,
            x: X_CENTER_RIGHT - 50,
            y: Y_CENTER_RIGHT + 50,
        },
    };

    const logoDeviteLeft = configLeft.logoDevite && {
        img: configLeft.logoDevite === LogoDeviteColor.Silver ? logoDeviteSilver : logoDeviteGold,
        conf: {
            rotation: 15,
            x: X_CENTER_LEFT + 70,
            y: Y_CENTER_LEFT - 50,
        },
    };

    return {
        imagesLeft,
        imagesRight,
        logoRight,
        logoLeft,
        logoDeviteRight,
        logoDeviteLeft,
    };
};
