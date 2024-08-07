import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@theme/fonts.css";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { theme } from "../theme/theme";

export default function App({ Component, pageProps }: any) {
    return (
        <MantineProvider theme={theme}>
            <Head>
                <title>Devite Audio | Конфигуратор</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <meta
                    name="description"
                    content="Ушные мониторы для музыкантов, кастомные наушники, IEM, наушники по слепку уха, купить Москва, Санкт-Петербург, Новосибирск, Екатеринбург, Краснодар, Ростов, Владивосток, Казань, Тюмень"
                ></meta>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>

            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </MantineProvider>
    );
}
