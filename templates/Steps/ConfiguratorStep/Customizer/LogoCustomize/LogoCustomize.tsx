import { ImageUploader } from "@atoms/ImageUploader/ImageUploader";
import { Info } from "@atoms/Info/Info";
import { selectedDragLogoState, useConfigState, useOrderState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const LogoCustomize = () => {
    const { setLogo, initLogoConfig } = useConfigState();
    const [{ currentSide }, { setLROrder }] = useOrderState();
    const [, setIsSelected] = useRecoilState(selectedDragLogoState);

    const onCompleteUpload = (data: string) => {
        setLogo(data);
        setLROrder("logoImg", data);
    };

    const onDeleteImage = () => {
        setLogo(undefined);
        initLogoConfig();
        setLROrder("logoImg", undefined);
    };

    useEffect(() => () => setIsSelected(false), [setIsSelected]);

    return (
        <>
            <ImageUploader
                file={currentSide.logoImg}
                onComplete={onCompleteUpload}
                onDelete={onDeleteImage}
            />

            <Info mt={{ base: 12, [MAIN_BREAKPOINT]: 16 }}>
                Размер и расположение Вашего изображения и логотипа, согласовываются после обработки
                слепков.
            </Info>
        </>
    );
};
