"use client";
import type { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";
import AppStatusLoader from "../AppStatusLoader";
import type { RawConfiguration } from "../ConfigurationProvider";
import ConfigurationProvider from "../ConfigurationProvider";
import ConnectorProvider from "../ConnectorProvider/ConnectorProvider";
import StateProvider from "../StateProvider/StateProvider";
import type { ThemeProviderProps } from "../ThemeProvider/ThemeProvider";
import ThemeProvider from "../ThemeProvider/ThemeProvider";
import { Toaster } from "react-hot-toast";

export type ConnectedProviderProps = {
  config?: RawConfiguration;
} & ThemeProviderProps;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const ConnectedProvider = (
  props: PropsWithChildren<ConnectedProviderProps>
) => {
  const { config, children, ...themeProps } = props;
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider {...themeProps}>
            <Toaster />
            <StateProvider>
              <AppStatusLoader config={config}>
                <ConfigurationProvider>
                  <ConnectorProvider>{children}</ConnectorProvider>
                </ConfigurationProvider>
              </AppStatusLoader>
            </StateProvider>
          </ThemeProvider>
        </DndProvider>
      </QueryClientProvider>
    </div>
  );
};

export default ConnectedProvider;
