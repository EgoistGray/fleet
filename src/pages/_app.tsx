import "@/styles/globals.css";
import { api } from "@/utils/api";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalsProvider>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            colorScheme: "light",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ModalsProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
