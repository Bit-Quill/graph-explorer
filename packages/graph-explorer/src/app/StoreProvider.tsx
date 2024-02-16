"use client";
import React, { createContext, useMemo } from "react";
import {
  Box,
  Button,
  ContentLayout,
  Header,
  Link,
  SpaceBetween,
} from "@cloudscape-design/components";
import { atomWithStorage } from "jotai/utils";
import { atomWithToggleAndStorage } from "./state/atomWithToggleAndStorage";
import TopBarWithLogo from "@/app/workspaces/common/TopBarWithLogo";

// Define initial state
const initialState = {
  // ... your initial state values
  isDarkMode: false,
};

// Create persistent atoms
// will have an initial value set to false & get stored in localStorage under the key "isActive"
const isDarkModeAtom = atomWithToggleAndStorage("isDarkMode");
const configurationsAtom = atomWithStorage("configurations", []);

// Create context for nested components
export const StoreContext = createContext(initialState);

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({
      isDarkModeAtom,
      configurationsAtom,
      // ... other atoms
    }),
    []
  );
  return (
    <ContentLayout
      header={
        <SpaceBetween size="m">
          <Header
            variant="h1"
            info={
              <Link>
                <Box variant="small">Version</Box> 2.0.0
              </Link>
            }
            actions={
              <Button
                iconAlign="right"
                variant="primary"
                href="/graph-explorer"
              >
                Open Graph Explorer
              </Button>
            }
          >
            Graph Explorer
          </Header>
        </SpaceBetween>
      }
    >
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    </ContentLayout>
  );
}
