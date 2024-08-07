import { Checkbox } from "@atoms/CheckBox/CheckBox";
import { Text } from "@atoms/Text/Text";
import { TextInput } from "@atoms/TextInput/TextInput";
import { Box, Flex, SimpleGrid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { stageToPDF } from "@organisms/Configurator/helper";
import { orderState, requestOrderStatusState, stepState } from "@store/store";
import { MAIN_BREAKPOINT } from "@templates/constants";
import { Form, Steps } from "@type/all";
import jsPDF from "jspdf";
import Konva from "konva";
import dynamic from "next/dynamic";
import { forwardRef, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export const FormStep = () => {
    const setStep = useSetRecoilState(stepState);
    const [state] = useRecoilState(orderState);
    const [, setStatus] = useRecoilState(requestOrderStatusState);

    const stageRef = useRef<Konva.Stage>(null);

    const form = useForm<Form>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            phone: "",
            email: "",
            city: "",
            pvz: "",
            personal: false,
            warranty: false,
        },
        validateInputOnChange: false,
        clearInputErrorOnChange: true,
        validate: {
            name: isNotEmpty("Обязательное поле"),
            phone: (value) => (/^[0-9]{10,12}$/.test(value) ? null : "Неверный номер"),
            email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Неверный имейл"),
            city: isNotEmpty("Обязательное поле"),
            pvz: isNotEmpty("Обязательное поле"),
            personal: (value) => (value === false ? "Обязательное поле" : null),
            warranty: (value) => (value === false ? "Обязательное поле" : null),
        },
    });

    const submit = async () => {
        setStatus("loading");

        const file = stageToPDF(stageRef);
        const isSuccess = await sendOrder(file);

        isSuccess && setStep(Steps.Success);
    };

    const sendOrder = async (file?: jsPDF) => {
        if (!file) {
            return false;
        }

        const order = {
            ...state,
            left: { ...state.left, logoImg: "" },
            right: { ...state.right, logoImg: "" },
        };

        var formData = new FormData();
        formData.append("file", file.output("blob"));
        formData.append("order", JSON.stringify({ ...order, ...form.getValues() }));

        const response = await fetch("/send-order.php", {
            method: "POST",
            body: formData,
        });

        setStatus(response.ok ? "success" : "failed");

        return response.ok;
    };

    return (
        <Box
            mx="auto"
            my={{ base: 12, [MAIN_BREAKPOINT]: 10 }}
            maw={{ base: "100%", [MAIN_BREAKPOINT]: 970 }}
            w="100%"
        >
            <Text
                variant={{ base: "headline18", [MAIN_BREAKPOINT]: "title40" }}
                color="grey800"
                mb={{ base: 16, [MAIN_BREAKPOINT]: 103 }}
                ta="center"
            >
                Данные для заказа
            </Text>

            <form id="orderForm" onSubmit={form.onSubmit(submit)}>
                <SimpleGrid
                    cols={{ base: 1, [MAIN_BREAKPOINT]: 2 }}
                    spacing={{ base: 16, [MAIN_BREAKPOINT]: 60 }}
                >
                    <Flex direction="column" gap={{ base: 16, [MAIN_BREAKPOINT]: 32 }}>
                        <TextInput placeholder="ФИО" {...form.getInputProps("name")} />

                        <TextInput placeholder="Номер телефона" {...form.getInputProps("phone")} />

                        <TextInput
                            placeholder="Электронная почта"
                            {...form.getInputProps("email")}
                        />
                    </Flex>

                    <Flex direction="column" gap={{ base: 16, [MAIN_BREAKPOINT]: 32 }}>
                        <TextInput placeholder="Город" {...form.getInputProps("city")} />

                        <TextInput placeholder="Пункт выдачи СДЭК" {...form.getInputProps("pvz")} />
                    </Flex>
                </SimpleGrid>

                <Checkbox
                    mt={{ base: 28, [MAIN_BREAKPOINT]: 40 }}
                    label={
                        <>
                            Принимаю соглашение об обработке{" "}
                            <Box
                                component="a"
                                href="https://deviteaudio.ru/legal.html"
                                target="_blank"
                            >
                                персональных данных
                            </Box>
                        </>
                    }
                    {...form.getInputProps("personal", { type: "checkbox" })}
                />

                <Checkbox
                    mt={12}
                    label={
                        <>
                            Ознакомлен с{" "}
                            <Box
                                component="a"
                                href="https://deviteaudio.ru/legal.html"
                                target="_blank"
                            >
                                условиями
                            </Box>{" "}
                            изготовления и гарантии
                        </>
                    }
                    {...form.getInputProps("warranty", { type: "checkbox" })}
                />
            </form>

            <Box w="100%" maw={400} h={0} style={{ visibility: "hidden" }}>
                <Configurator ref={stageRef} />
            </Box>
        </Box>
    );
};

const ConfiguratorLazy = dynamic(
    () =>
        import("organisms/Configurator/Configurator").then((module) => ({
            default: module.Configurator,
        })),
    {
        ssr: false,
    },
);
const Configurator = forwardRef<Konva.Stage>((_, ref) => <ConfiguratorLazy stageRef={ref} />);
Configurator.displayName = "Configurator";
