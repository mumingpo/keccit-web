import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Kecc it!</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          // /** Put your mantine theme override here */
          // colorScheme: "dark",
        }}
      >
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
