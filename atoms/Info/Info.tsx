import alert from "@assets/alert.svg";
import { Text } from "@atoms/Text/Text";
import { Flex, FlexProps } from "@mantine/core";
import { MAIN_BREAKPOINT } from "@templates/constants";
import Image from "next/image";
import React from "react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
} & FlexProps;

export const Info = ({ children, ...rest }: Props) => (
    <Flex gap={8} align="start" {...rest}>
        <Image src={alert} alt="" />

        <Text variant={{ base: "mobile16", [MAIN_BREAKPOINT]: "headline18" }} color="grey800">
            {children}
        </Text>
    </Flex>
);
