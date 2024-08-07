import { selectedDragLogoState, useConfigState } from "@store/store";
import Konva from "konva";
import { SceneContext } from "konva/lib/Context";
import { useEffect, useRef, useState } from "react";
import { Group, Image, Transformer } from "react-konva";
import { useRecoilState } from "recoil";
import { useColors } from "theme/theme";
import { ConfiguratorImage } from "../types";

type ConfiguratorLogoProps = {
    logo: ConfiguratorImage;
    clipFunction: (ctx: SceneContext) => void;
};

export const ConfiguratorLogo = ({ logo, clipFunction }: ConfiguratorLogoProps) => {
    const colors = useColors();
    const { setLogoConfig } = useConfigState();
    const [isSelected, setIsSelected] = useRecoilState(selectedDragLogoState);
    const [params, setParams] = useState(logo.conf);

    const logoRef = useRef<Konva.Image>(null);
    const transformRef = useRef<Konva.Transformer>(null);

    const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        setParams((prev) => ({
            ...prev,
            x: e.target.x(),
            y: e.target.y(),
        }));
    };

    const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
        if (logoRef.current) {
            const node = logoRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            setParams((prev) => ({
                ...prev,
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
            }));
        }
    };

    useEffect(() => {
        if (isSelected && logoRef.current) {
            transformRef.current?.nodes([logoRef.current]);
            transformRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    useEffect(() => {
        return () => {
            params && setLogoConfig(params);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <>
            <Group clipFunc={clipFunction}>
                <Image
                    ref={logoRef}
                    image={logo.img}
                    alt=""
                    onClick={() => setIsSelected((prev) => !prev)}
                    onDragEnd={onDragEnd}
                    onTransformEnd={onTransformEnd}
                    draggable={true}
                    {...params}
                />
            </Group>

            {isSelected && (
                <Transformer
                    ref={transformRef}
                    flipEnabled={false}
                    anchorStroke={colors.aqua}
                    anchorFill={colors.aqua}
                    anchorSize={20}
                    borderStroke={colors.aqua}
                    anchorCornerRadius={20}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};
