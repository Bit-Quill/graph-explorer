import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@cloudscape-design/global-styles/index.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";

import { grabConfig } from "./actions/graphExplorer/grabConfig";
import ConnectedProvider from "./core/ConnectedProvider";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graph Explorer",
  description:
    "React-based web application that enables users to visualize both property graph and RDF data and explore connections between data without having to write graph queries.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = (await grabConfig()) || {
    id: "Default Connection",
    displayLabel: "Default Connection",
    connection: {
      url: "https://nep-export-test-1.cluster-cjiepzx2kerx.us-west-2.neptune.amazonaws.com:8182",
      queryEngine: "gremlin",
      proxyConnection: false,
      graphDbUrl: "",
      awsAuthEnabled: false,
      awsRegion: "",
      fetchTimeoutMs: 240000,
    },
  }; // Fetch configuration on the server
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider
          theme={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          <ConnectedProvider config={config}>
            {children}
            <Toaster />
          </ConnectedProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
