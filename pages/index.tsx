"use client";
import { Box, Button, Flex } from "@mantine/core";
import { Header } from "./components/Header/Header";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
    ConfiguratorColor,
    ConfiguratorConfig,
    ConfiguratorItemConfig,
} from "./components/Configurator/types";
import { Menu } from "./components/Menu/Menu";
import { Customizer } from "./components/Customizer/Customizer";

const Configurator = dynamic(
    () =>
        import("./components/Configurator/Configurator").then((module) => ({
            default: module.Configurator,
        })),
    {
        ssr: false,
    },
);

const defaultConfig: ConfiguratorConfig = {
    left: {
        bg: {
            red: 0,
            blue: 202,
            green: 100,
            opacity: 1,
        },
        top: {
            red: 0,
            blue: 201,
            green: 100,
            opacity: 0.5,
        },
    },
    right: {
        bg: {
            red: 100,
            blue: 0,
            green: 100,
            opacity: 1,
        },
        top: {
            red: 100,
            blue: 1,
            green: 100,
            opacity: 0.5,
        },
    },
};

export default function IndexPage() {
    const [config, setConfig] = useState<ConfiguratorConfig>(defaultConfig);
    console.log("config :>> ", config);

    const setLeft = (config: ConfiguratorItemConfig) => {
        setConfig((prev) => ({ ...prev, left: { ...prev.left, ...config } }));
    };

    const setRight = (config: ConfiguratorItemConfig) => {
        setConfig((prev) => ({ ...prev, right: { ...prev.right, ...config } }));
    };

    return (
        <Box>
            <Header />

            <Flex direction={{ base: "column", sm: "row" }}>
                <Customizer setConfig={setConfig} />

                <div>
                    <Box w={600} h={400} p={10}>
                        <Configurator left={config.left} right={config.right} />
                    </Box>

                    <Menu />
                </div>
            </Flex>
        </Box>
    );
}
