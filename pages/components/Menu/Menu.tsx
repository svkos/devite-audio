import { Box, Flex, Text } from "@mantine/core";

enum MenuEnum {
    Model,
    Shell,
    FacePlate,
    Artwork,
    Cable,
    Finalize,
}

const menu = [
    { id: MenuEnum.Model, title: "Модель" },
    { id: MenuEnum.Shell, title: "Корпус" },
    { id: MenuEnum.FacePlate, title: "Крышка" },
    { id: MenuEnum.FacePlate, title: "Рисунок" },
    { id: MenuEnum.Cable, title: "Кабель" },
    { id: MenuEnum.Finalize, title: "Итого" },
];

export const Menu = () => {
    return (
        <Flex gap={10}>
            {menu.map(({ id, title }) => (
                <Text key={id} size="lg" c="white" style={{ cursor: "pointer" }}>
                    {title}
                </Text>
            ))}
        </Flex>
    );
};
