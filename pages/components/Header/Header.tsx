import { Box, Flex, Text } from "@mantine/core";
import logo from "../../assets/logo.svg";
import vk from "../../assets/vk.svg";
import inst from "../../assets/inst.svg";

import Image from "next/image";
import { INST_LINK, PHONE, VK_LINK } from "../constants";
import { ReactNode } from "react";

export const Header = () => (
    <Box component="header" p={16}>
        <Flex justify="space-between" align="center">
            <Flex justify="space-between">
                <Image src={logo} alt="Devite Audio" height={40} />
            </Flex>

            <Flex gap={24}>
                <MenuRow link={"/model"}>Модели</MenuRow>
                <MenuRow link={"/model"}>Как заказать</MenuRow>
                <MenuRow link={"/model"}>О нас</MenuRow>
                <MenuRow link={"/model"}>Контакты</MenuRow>
                <MenuRow link={"/model"}>Гарантия и условия</MenuRow>
            </Flex>

            <Flex gap={12}>
                <a href={VK_LINK}>
                    <Image src={vk} alt="Devite Audio VK" />
                </a>

                <a href={INST_LINK}>
                    <Image src={inst} alt="Devite Audio INSTAGRAM" />
                </a>

                <Text
                    size="24px"
                    c="gray.0"
                    component="a"
                    href={`tel:${PHONE.replace(/[^a-zA-Z0-9]/g, "")}`}
                >
                    {PHONE}
                </Text>
            </Flex>
        </Flex>
    </Box>
);

const MenuRow = ({ children, link }: { children: ReactNode; link: string }) => (
    <Text size="22px" c="gray.6" component="a" href={link} h="fit-content">
        {children}
    </Text>
);
