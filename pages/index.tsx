import { Box, Button, Group } from "@mantine/core";

export default function IndexPage() {
    return (
        <Group mt={50} justify="center">
            <Button size="xl">Welcome to Mantine!</Button>
            <Box mt={200}>
                <Button size="xl">Welcome to Mantine!</Button>
                <Button size="xl">Welcome to Mantine!</Button>
            </Box>
        </Group>
    );
}
