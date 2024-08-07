import download from "@assets/download.png";
import { Text } from "@atoms/Text/Text";
import { Box, FileButton, Flex, FlexProps } from "@mantine/core";
import { MAIN_BREAKPOINT } from "@templates/constants";
import Image from "next/image";
import { ReactNode } from "react";
import Resizer from "react-image-file-resizer";
import { useColors } from "theme/theme";

type Props = {
    file?: string;
    onComplete: (data: string) => void;
    onDelete: () => void;
} & FlexProps;

export type CropType = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const MAX_SIDE_WIDTH = 500;

const resizeFile = (file: File) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            MAX_SIDE_WIDTH,
            MAX_SIDE_WIDTH,
            "PNG",
            100,
            0,
            (uri) => resolve(uri),
            "base64",
        );
    });

export const ImageUploader = ({ file, onComplete, onDelete, ...componentProps }: Props) => {
    const uploadImage = async (uploadFile: File | null) => {
        if (uploadFile) {
            const image = (await resizeFile(uploadFile)) as string;
            onComplete(image);
        }
    };

    const onDeleteImage = () => {
        onDelete();
    };

    return (
        <>
            {file && (
                <>
                    <Wrapper justify="center" {...componentProps} py={0}>
                        <Flex align="center" h="100%" style={{ overflow: "hidden" }}>
                            <Box component="img" src={file} alt="" />
                        </Flex>
                    </Wrapper>

                    <Text
                        variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                        style={{ cursor: "pointer", textDecoration: "underline" }}
                        onClick={onDeleteImage}
                        ta="center"
                        mt={16}
                    >
                        Удалить изображение
                    </Text>
                </>
            )}

            {!file && (
                <FileButton onChange={uploadImage} accept="image/png,image/jpeg">
                    {(fileProps) => (
                        <Wrapper
                            align="center"
                            direction="column"
                            {...componentProps}
                            {...fileProps}
                        >
                            <Image src={download} alt="download" />

                            <Text variant={{ base: "headline18", [MAIN_BREAKPOINT]: "headline24" }}>
                                Загрузите свою картинку
                            </Text>

                            <Text
                                variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline20" }}
                                maw={545}
                                ta="center"
                                color="grey800"
                                mt={{ base: 8, [MAIN_BREAKPOINT]: 0 }}
                            >
                                цвета при печати изображений могут отличаться от цвета макета
                            </Text>
                        </Wrapper>
                    )}
                </FileButton>
            )}
        </>
    );
};

const Wrapper = ({ children, ...rest }: { children: ReactNode } & FlexProps) => {
    const colors = useColors();

    return (
        <Flex
            style={{
                border: `2px dashed ${colors.grey600}`,
                borderRadius: "20px",
                cursor: "pointer",
            }}
            h={{ base: 128, [MAIN_BREAKPOINT]: 204 }}
            py={{ base: 14, [MAIN_BREAKPOINT]: 48 }}
            px={{ base: 30, [MAIN_BREAKPOINT]: 74 }}
            {...rest}
        >
            {children}
        </Flex>
    );
};
