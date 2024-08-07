import cableBlackImg from "@assets/cable-black.png";
import cableWhiteImg from "@assets/cable-white.png";
import minusImg from "@assets/minus.svg";
import plusImg from "@assets/plus.svg";
import Button from "@atoms/Button/Button";
import { Text } from "@atoms/Text/Text";
import { Flex } from "@mantine/core";
import { orderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import Image, { StaticImageData } from "next/image";
import { useRecoilState } from "recoil";

export const CableCustomize = () => {
    const [{ cable }, setOrder] = useRecoilState(orderState);

    const changeAmount = (type: "black" | "white", amount: number) => {
        setOrder((prev) => ({ ...prev, cable: { ...prev.cable, [type]: amount } }));
    };

    return (
        <>
            <Flex
                direction={{ base: "column", [MAIN_BREAKPOINT]: "row" }}
                gap={{ base: 24, [MAIN_BREAKPOINT]: 42 }}
                justify="center"
            >
                <Cable
                    img={cableBlackImg}
                    alt="Devite Audio черный кабель"
                    onMinus={() =>
                        cable.black !== 0 && changeAmount("black", Number(cable.black) - 1)
                    }
                    onPlus={() => changeAmount("black", Number(cable.black) + 1)}
                    text={cable.black}
                />

                <Cable
                    img={cableWhiteImg}
                    alt="Devite Audio белый кабель"
                    onMinus={() =>
                        cable.white !== 0 && changeAmount("white", Number(cable.white) - 1)
                    }
                    onPlus={() => changeAmount("white", Number(cable.white) + 1)}
                    text={cable.white}
                />
            </Flex>

            <Text variant="headline20" ta="center" mt={{ base: 28, [MAIN_BREAKPOINT]: 44 }}>
                Дополнительный кабель + 3 400₽
            </Text>
        </>
    );
};

type CableProps = {
    img: StaticImageData;
    alt: string;
    onMinus: () => void;
    onPlus: () => void;
    text?: number;
};
const Cable = ({ img, alt, onMinus, onPlus, text }: CableProps) => (
    <Flex
        maw={{ base: 127, [MAIN_BREAKPOINT]: 260 }}
        direction={{ base: "row", [MAIN_BREAKPOINT]: "column" }}
        align="center"
        gap={34}
    >
        <Image src={img} alt={alt} width={0} height={0} style={{ width: "100%", height: "auto" }} />

        <Flex gap={{ base: 0, [MAIN_BREAKPOINT]: 8 }} align="center">
            <Button
                p={0}
                mode="v1"
                onClick={onMinus}
                rightSection={
                    <Button.Round>
                        <Image src={minusImg} alt="" width={16} />
                    </Button.Round>
                }
            />

            <Text
                w={44}
                ta="center"
                variant={{ base: "mobile18", [MAIN_BREAKPOINT]: "headline30" }}
            >
                {text}
            </Text>

            <Button
                p={0}
                mode="v1"
                onClick={onPlus}
                leftSection={
                    <Button.Round>
                        <Image src={plusImg} alt="" width={16} />
                    </Button.Round>
                }
            />
        </Flex>
    </Flex>
);
